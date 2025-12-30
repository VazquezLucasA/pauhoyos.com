const express = require("express");
const psikipediaController = require("../controllers/psikipediaController");
const { requireSession, roleGuard } = require("../middlewares/authGuard");

const router = express.Router();

// Público (o al menos visible sin suscripción, para ver el catálogo)
router.get("/courses", psikipediaController.getCourses);

// Protegido: Requiere login Y suscripción activa (validada en el controlador)
router.get("/courses/:id/materials", requireSession, psikipediaController.getMaterials);

// Admin: Activar suscripción manual
router.post(
    "/subscriptions/manual-activate",
    requireSession,
    roleGuard(['admin']),
    psikipediaController.manualActivateSubscription
);

module.exports = router;
