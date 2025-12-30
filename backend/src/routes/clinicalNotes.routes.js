const express = require("express");
const clinicalNotesController = require("../controllers/clinicalNotesController");
const { requireSession, roleGuard } = require("../middlewares/authGuard");

const router = express.Router();

// Middleware de sesión para todas las rutas
router.use(requireSession);

// Middleware de rol: SOLO psicólogos (admin excluido explícitamente al no listarlo)
router.use(roleGuard(['psychologist']));

router.get("/:userId", clinicalNotesController.getPatientNotes);
router.post("/", clinicalNotesController.createNote);
router.put("/:id", clinicalNotesController.updateNote);

module.exports = router;
