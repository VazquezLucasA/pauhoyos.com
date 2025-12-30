const { pool } = require("../config/db");

async function createUser({ fullName, email, passwordHash, dni, phone, role }) {
    const [result] = await pool.query(
        `INSERT INTO users (full_name, email, password_hash, dni, phone, role)
     VALUES (?, ?, ?, ?, ?, ?)`,
        [fullName, email, passwordHash, dni || null, phone || null, role || 'user']
    );
    return result.insertId;
}

async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows[0];
}

async function findUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
    return rows[0];
}

async function updateUser(id, data) {
    const fields = [];
    const values = [];

    if (data.fullName !== undefined) { fields.push("full_name = ?"); values.push(data.fullName); }
    if (data.dni !== undefined) { fields.push("dni = ?"); values.push(data.dni); }
    if (data.phone !== undefined) { fields.push("phone = ?"); values.push(data.phone); }
    if (data.isActive !== undefined) { fields.push("is_active = ?"); values.push(data.isActive); }
    if (data.role !== undefined) { fields.push("role = ?"); values.push(data.role); }

    if (fields.length === 0) return false;

    values.push(id);
    const [result] = await pool.query(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}

async function updatePassword(id, passwordHash) {
    const [result] = await pool.query(
        "UPDATE users SET password_hash = ? WHERE id = ?",
        [passwordHash, id]
    );
    return result.affectedRows > 0;
}

async function markEmailVerified(id) {
    const [result] = await pool.query(
        "UPDATE users SET is_email_confirmed = 1 WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUser,
    updatePassword,
    markEmailVerified,
};
