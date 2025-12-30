const { pool } = require("../config/db");

async function createNote({ userId, psychologistId, appointmentId, title, body }) {
    const [result] = await pool.query(
        `INSERT INTO clinical_notes (user_id, psychologist_id, appointment_id, title, body)
     VALUES (?, ?, ?, ?, ?)`,
        [userId, psychologistId, appointmentId || null, title, body]
    );
    return result.insertId;
}

async function getNotesByPatient(userId, psychologistId) {
    const [rows] = await pool.query(
        `SELECT * FROM clinical_notes 
     WHERE user_id = ? AND psychologist_id = ?
     ORDER BY created_at DESC`,
        [userId, psychologistId]
    );
    return rows;
}

async function getNoteById(id) {
    const [rows] = await pool.query("SELECT * FROM clinical_notes WHERE id = ?", [id]);
    return rows[0];
}

async function updateNote(id, { title, body }) {
    const [result] = await pool.query(
        "UPDATE clinical_notes SET title = ?, body = ? WHERE id = ?",
        [title, body, id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createNote,
    getNotesByPatient,
    getNoteById,
    updateNote,
};
