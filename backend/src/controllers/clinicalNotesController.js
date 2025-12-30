const clinicalNotesModel = require("../models/clinicalNotesModel");
const psychologistsModel = require("../models/psychologistsModel");

async function getPatientNotes(req, res, next) {
    try {
        const { userId } = req.params;
        const psychProfile = await psychologistsModel.getPsychologistByUserId(req.user.id);

        if (!psychProfile) return res.status(403).json({ error: "Perfil de psicólogo no encontrado" });

        const notes = await clinicalNotesModel.getNotesByPatient(userId, psychProfile.id);
        res.json(notes);
    } catch (err) {
        next(err);
    }
}

async function createNote(req, res, next) {
    try {
        const { user_id, title, body, appointment_id } = req.body;
        const psychProfile = await psychologistsModel.getPsychologistByUserId(req.user.id);

        if (!psychProfile) return res.status(403).json({ error: "Perfil de psicólogo no encontrado" });

        const noteId = await clinicalNotesModel.createNote({
            userId: user_id,
            psychologistId: psychProfile.id,
            appointmentId: appointment_id,
            title,
            body
        });

        res.status(201).json({ message: "Nota creada", noteId });
    } catch (err) {
        next(err);
    }
}

async function updateNote(req, res, next) {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        const psychProfile = await psychologistsModel.getPsychologistByUserId(req.user.id);

        if (!psychProfile) return res.status(403).json({ error: "Perfil de psicólogo no encontrado" });

        const note = await clinicalNotesModel.getNoteById(id);
        if (!note) return res.status(404).json({ error: "Nota no encontrada" });

        if (note.psychologist_id !== psychProfile.id) {
            return res.status(403).json({ error: "No tienes permiso para editar esta nota" });
        }

        await clinicalNotesModel.updateNote(id, { title, body });
        res.json({ message: "Nota actualizada" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getPatientNotes,
    createNote,
    updateNote,
};
