const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./users.routes");
const appointmentsRoutes = require("./appointments.routes");
const clinicalNotesRoutes = require("./clinicalNotes.routes");
const psikipediaRoutes = require("./psikipedia.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/clinical-notes", clinicalNotesRoutes);
router.use("/", psikipediaRoutes); // Montar en raíz para /api/courses, etc.
router.use("/", appointmentsRoutes); // Montar en raíz para que coincida con /api/availability y /api/appointments

router.get("/health", (_req, res) => res.json({ status: "ok" }));

module.exports = router;
