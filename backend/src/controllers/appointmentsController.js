const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const isBetween = require("dayjs/plugin/isBetween");
const appointmentsModel = require("../models/appointmentsModel");
const availabilitiesModel = require("../models/availabilitiesModel");
const psychologistsModel = require("../models/psychologistsModel");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

async function getAvailability(req, res, next) {
    try {
        const { psychologistId } = req.params;
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({ error: "Parámetros 'from' y 'to' son requeridos" });
        }

        const startDate = dayjs(from).startOf('day');
        const endDate = dayjs(to).endOf('day');

        // 1. Obtener reglas de disponibilidad
        const availabilities = await availabilitiesModel.getAvailabilitiesByPsychologist(psychologistId);

        // 2. Obtener turnos ocupados en el rango
        const appointments = await appointmentsModel.getAppointmentsByPsychologist(
            psychologistId,
            startDate.toDate(),
            endDate.toDate()
        );

        const availableSlots = [];
        let currentDate = startDate;

        // Iterar por cada día del rango
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
            const dayOfWeek = currentDate.day(); // 0 = Domingo, 6 = Sábado

            // Buscar reglas para este día de la semana
            const dayRules = availabilities.filter(a => a.weekday === dayOfWeek);

            for (const rule of dayRules) {
                // Parsear horas de inicio y fin de la regla
                // Las horas vienen como string "HH:mm:ss" desde la DB
                const [startHour, startMinute] = rule.start_time.split(':');
                const [endHour, endMinute] = rule.end_time.split(':');

                let slotStart = currentDate.hour(startHour).minute(startMinute).second(0);
                const ruleEnd = currentDate.hour(endHour).minute(endMinute).second(0);
                const slotDuration = rule.slot_duration_minutes || 30;

                // Generar slots de 30 mins
                while (slotStart.add(slotDuration, 'minute').isSame(ruleEnd) || slotStart.add(slotDuration, 'minute').isBefore(ruleEnd)) {
                    const slotEnd = slotStart.add(slotDuration, 'minute');

                    // Verificar si el slot está ocupado
                    const isOccupied = appointments.some(app => {
                        if (app.status === 'cancelled_by_user' || app.status === 'cancelled_by_psychologist') return false;

                        const appStart = dayjs(app.start_datetime);
                        const appEnd = appStart.add(app.duration_minutes, 'minute');

                        // Superposición simple
                        return (
                            (slotStart.isSame(appStart) || slotStart.isAfter(appStart)) && slotStart.isBefore(appEnd)
                        );
                    });

                    // Verificar que sea futuro (> 10 min desde ahora)
                    const isFuture = slotStart.diff(dayjs(), 'minute') > 10;

                    if (!isOccupied && isFuture) {
                        availableSlots.push({
                            start: slotStart.format(),
                            end: slotEnd.format(),
                        });
                    }

                    slotStart = slotStart.add(slotDuration, 'minute');
                }
            }

            currentDate = currentDate.add(1, 'day');
        }

        res.json(availableSlots);
    } catch (err) {
        next(err);
    }
}

async function createAppointment(req, res, next) {
    try {
        const { psychologist_id, start_datetime } = req.body;
        const userId = req.user.id;
        const slotDuration = 30; // Por ahora fijo

        const start = dayjs(start_datetime);

        // 1. Validar futuro
        if (start.diff(dayjs(), 'minute') <= 10) {
            return res.status(400).json({ error: "El turno debe ser al menos 10 minutos en el futuro" });
        }

        // 2. Validar disponibilidad (regla general)
        const dayOfWeek = start.day();
        const availabilities = await availabilitiesModel.getAvailabilitiesByPsychologist(psychologist_id);
        const dayRules = availabilities.filter(a => a.weekday === dayOfWeek);

        let fitsInRule = false;
        const timeString = start.format('HH:mm:ss');

        for (const rule of dayRules) {
            if (timeString >= rule.start_time && timeString < rule.end_time) {
                // Verificar alineación con slots (opcional, pero recomendado)
                // Aquí asumimos que si cae dentro del rango es válido por simplicidad,
                // o se podría validar modulo slot_duration
                fitsInRule = true;
                break;
            }
        }

        if (!fitsInRule) {
            return res.status(400).json({ error: "Horario no disponible según la agenda del profesional" });
        }

        // 3. Validar colisión con otros turnos
        const isAvailable = await appointmentsModel.checkAvailability(psychologist_id, start.toDate(), slotDuration);
        if (!isAvailable) {
            return res.status(409).json({ error: "El turno ya está ocupado" });
        }

        // 4. Crear turno
        const appointmentId = await appointmentsModel.createAppointment({
            userId,
            psychologistId: psychologist_id,
            startDatetime: start.toDate(),
            durationMinutes: slotDuration
        });

        res.status(201).json({ message: "Turno reservado con éxito", appointmentId });
    } catch (err) {
        next(err);
    }
}

async function cancelAppointment(req, res, next) {
    try {
        const { id } = req.params;
        const { cancellation_reason } = req.body;
        const user = req.user;

        const appointment = await appointmentsModel.getAppointmentById(id);
        if (!appointment) return res.status(404).json({ error: "Turno no encontrado" });

        let newStatus = '';

        if (user.role === 'user') {
            if (appointment.user_id !== user.id) {
                return res.status(403).json({ error: "No tienes permiso para cancelar este turno" });
            }
            const start = dayjs(appointment.start_datetime);
            if (start.diff(dayjs(), 'minute') <= 10) {
                return res.status(400).json({ error: "No se puede cancelar con menos de 10 minutos de anticipación" });
            }
            newStatus = 'cancelled_by_user';
        } else if (user.role === 'psychologist' || user.role === 'admin') {
            // Validar que sea SU turno si es psicólogo
            if (user.role === 'psychologist') {
                const psychProfile = await psychologistsModel.getPsychologistByUserId(user.id);
                if (!psychProfile || psychProfile.id !== appointment.psychologist_id) {
                    return res.status(403).json({ error: "No tienes permiso para cancelar este turno" });
                }
            }
            newStatus = 'cancelled_by_psychologist';
        } else {
            return res.status(403).json({ error: "Rol no autorizado" });
        }

        await appointmentsModel.updateAppointmentStatus(id, newStatus, cancellation_reason);
        res.json({ message: "Turno cancelado" });
    } catch (err) {
        next(err);
    }
}

async function getMyAppointments(req, res, next) {
    try {
        const appointments = await appointmentsModel.getAppointmentsByUser(req.user.id);
        res.json(appointments);
    } catch (err) {
        next(err);
    }
}

async function getTodayAppointments(req, res, next) {
    try {
        // Obtener perfil de psicólogo del usuario logueado
        const psychProfile = await psychologistsModel.getPsychologistByUserId(req.user.id);
        if (!psychProfile) {
            return res.status(403).json({ error: "No tienes perfil de psicólogo asociado" });
        }

        const startOfDay = dayjs().startOf('day').toDate();
        const endOfDay = dayjs().endOf('day').toDate();

        const appointments = await appointmentsModel.getAppointmentsByPsychologist(
            psychProfile.id,
            startOfDay,
            endOfDay
        );

        res.json(appointments);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAvailability,
    createAppointment,
    cancelAppointment,
    getMyAppointments,
    getTodayAppointments
};
