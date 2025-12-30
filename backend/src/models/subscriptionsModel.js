const { pool } = require("../config/db");

async function createSubscription({ userId, plan, status, startDate, endDate }) {
    const [result] = await pool.query(
        `INSERT INTO subscriptions (user_id, plan, status, start_date, end_date)
     VALUES (?, ?, ?, ?, ?)`,
        [userId, plan || 'full_access', status || 'active', startDate, endDate]
    );
    return result.insertId;
}

async function getActiveSubscription(userId) {
    const [rows] = await pool.query(
        `SELECT * FROM subscriptions 
     WHERE user_id = ? 
     AND status = 'active' 
     AND end_date > NOW() 
     ORDER BY end_date DESC 
     LIMIT 1`,
        [userId]
    );
    return rows[0];
}

module.exports = {
    createSubscription,
    getActiveSubscription,
};
