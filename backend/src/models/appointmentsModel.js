const { pool } = require("../config/db");

async function createAppointment({ userId, psychologistId, startDatetime, durationMinutes }) {
    const [result] = await pool.query(
        `INSERT INTO appointments (user_id, psychologist_id, start_datetime, duration_minutes)
     VALUES (?, ?, ?, ?)`,
        [userId, psychologistId, startDatetime, durationMinutes]
    );
    return result.insertId;
}

async function getAppointmentById(id) {
    const [rows] = await pool.query("SELECT * FROM appointments WHERE id = ?", [id]);
    return rows[0];
}

async function getAppointmentsByUser(userId) {
    const [rows] = await pool.query(
        `SELECT a.*, p.display_name as psychologist_name 
     FROM appointments a
     JOIN psychologists p ON a.psychologist_id = p.id
     WHERE a.user_id = ?
     ORDER BY a.start_datetime DESC`,
        [userId]
    );
    return rows;
}

async function getAppointmentsByPsychologist(psychologistId, fromDate, toDate) {
    let query = `
    SELECT a.*, u.full_name as user_name, u.email as user_email
    FROM appointments a
    JOIN users u ON a.user_id = u.id
    WHERE a.psychologist_id = ?
  `;
    const params = [psychologistId];

    if (fromDate) {
        query += " AND a.start_datetime >= ?";
        params.push(fromDate);
    }
    if (toDate) {
        query += " AND a.start_datetime <= ?";
        params.push(toDate);
    }

    query += " ORDER BY a.start_datetime ASC";

    const [rows] = await pool.query(query, params);
    return rows;
}

async function updateAppointmentStatus(id, status, cancellationReason = null) {
    const [result] = await pool.query(
        "UPDATE appointments SET status = ?, cancellation_reason = ? WHERE id = ?",
        [status, cancellationReason, id]
    );
    return result.affectedRows > 0;
}

async function checkAvailability(psychologistId, startDatetime, durationMinutes) {
    // Verificar superposición con otros turnos
    const endDatetime = new Date(new Date(startDatetime).getTime() + durationMinutes * 60000);

    const [rows] = await pool.query(
        `SELECT id FROM appointments 
     WHERE psychologist_id = ? 
     AND status = 'scheduled'
     AND (
       (start_datetime < ? AND DATE_ADD(start_datetime, INTERVAL duration_minutes MINUTE) > ?)
     )`,
        [psychologistId, endDatetime, startDatetime]
    );

    return rows.length === 0;
}

module.exports = {
    createAppointment,
    getAppointmentById,
    getAppointmentsByUser,
    getAppointmentsByPsychologist,
    updateAppointmentStatus,
    checkAvailability,
};
