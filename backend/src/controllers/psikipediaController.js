const coursesModel = require("../models/coursesModel");
const subscriptionsModel = require("../models/subscriptionsModel");
const dayjs = require("dayjs");

async function getCourses(req, res, next) {
    try {
        const courses = await coursesModel.getActiveCourses();
        res.json(courses);
    } catch (err) {
        next(err);
    }
}

async function getMaterials(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verificar suscripción activa
        const subscription = await subscriptionsModel.getActiveSubscription(userId);
        if (!subscription) {
            return res.status(403).json({ error: "Requiere suscripción activa para acceder a los materiales" });
        }

        const materials = await coursesModel.getCourseMaterials(id);
        res.json(materials);
    } catch (err) {
        next(err);
    }
}

async function manualActivateSubscription(req, res, next) {
    try {
        const { userId, days } = req.body;

        const startDate = dayjs().toDate();
        const endDate = dayjs().add(days || 30, 'day').toDate();

        const subId = await subscriptionsModel.createSubscription({
            userId,
            plan: 'full_access',
            status: 'active',
            startDate,
            endDate
        });

        res.status(201).json({ message: "Suscripción activada manualmente", subscriptionId: subId });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCourses,
    getMaterials,
    manualActivateSubscription,
};
