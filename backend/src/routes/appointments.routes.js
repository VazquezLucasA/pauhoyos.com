const express = require("express");
const appointmentsController = require("../controllers/appointmentsController");
const { requireSession, roleGuard } = require("../middlewares/authGuard");

const router = express.Router();

// Público (o al menos no requiere rol específico, pero sí sesión para reservar)
// Disponibilidad se puede ver sin login? Asumamos que sí para ver horarios, pero reservar requiere login.
// El requerimiento dice "GET /api/availability/:psychologistId", lo pondré aquí aunque no empiece con /appointments
// Pero mejor separar si es /availability. 
// El usuario pidió "GET /api/availability/:psychologistId" y "POST /api/appointments".
// Voy a poner todo en este router y luego montarlo en /api.

// Rutas de turnos
router.get("/availability/:psychologistId", appointmentsController.getAvailability);

router.post("/appointments", requireSession, appointmentsController.createAppointment);
router.post("/appointments/:id/cancel", requireSession, appointmentsController.cancelAppointment);
router.get("/appointments/mine", requireSession, appointmentsController.getMyAppointments);

// Rutas de psicólogo
router.get(
    "/appointments/today",
    requireSession,
    roleGuard(['psychologist', 'admin']),
    appointmentsController.getTodayAppointments
);

module.exports = router;
