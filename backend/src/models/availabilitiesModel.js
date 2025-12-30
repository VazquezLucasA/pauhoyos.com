const { pool } = require("../config/db");

async function createAvailability({ psychologistId, weekday, startTime, endTime, slotDurationMinutes }) {
    const [result] = await pool.query(
        `INSERT INTO availabilities (psychologist_id, weekday, start_time, end_time, slot_duration_minutes)
     VALUES (?, ?, ?, ?, ?)`,
        [psychologistId, weekday, startTime, endTime, slotDurationMinutes || 30]
    );
    return result.insertId;
}

async function getAvailabilitiesByPsychologist(psychologistId) {
    const [rows] = await pool.query(
        "SELECT * FROM availabilities WHERE psychologist_id = ? AND is_active = 1 ORDER BY weekday, start_time",
        [psychologistId]
    );
    return rows;
}

async function updateAvailability(id, { startTime, endTime, isActive }) {
    const fields = [];
    const values = [];

    if (startTime !== undefined) { fields.push("start_time = ?"); values.push(startTime); }
    if (endTime !== undefined) { fields.push("end_time = ?"); values.push(endTime); }
    if (isActive !== undefined) { fields.push("is_active = ?"); values.push(isActive); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(
        `UPDATE availabilities SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}

async function deleteAvailability(id) {
    const [result] = await pool.query("DELETE FROM availabilities WHERE id = ?", [id]);
    return result.affectedRows > 0;
}

module.exports = {
    createAvailability,
    getAvailabilitiesByPsychologist,
    updateAvailability,
    deleteAvailability,
};
