const { pool } = require("../config/db");

async function createSession({ userId, token, ipAddress, userAgent, expiresAt }) {
    const [result] = await pool.query(
        `INSERT INTO sessions (user_id, token, ip_address, user_agent, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
        [userId, token, ipAddress, userAgent, expiresAt]
    );
    return result.insertId;
}

async function findSessionByToken(token) {
    const [rows] = await pool.query(
        "SELECT * FROM sessions WHERE token = ? LIMIT 1",
        [token]
    );
    return rows[0];
}

async function deleteSession(token) {
    const [result] = await pool.query("DELETE FROM sessions WHERE token = ?", [token]);
    return result.affectedRows > 0;
}

async function deleteUserSessions(userId) {
    const [result] = await pool.query("DELETE FROM sessions WHERE user_id = ?", [userId]);
    return result.affectedRows;
}

module.exports = {
    createSession,
    findSessionByToken,
    deleteSession,
    deleteUserSessions,
};
