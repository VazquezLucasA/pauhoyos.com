const { pool } = require("../config/db");

async function createToken({ userId, token, type, expiresAt }) {
  const [result] = await pool.query(
    `INSERT INTO auth_tokens (user_id, token, type, expires_at)
     VALUES (?, ?, ?, ?)`,
    [userId, token, type, expiresAt]
  );
  return result.insertId;
}

async function findToken(token) {
  const [rows] = await pool.query(
    "SELECT * FROM auth_tokens WHERE token = ? LIMIT 1",
    [token]
  );
  return rows[0];
}

async function markTokenUsed(token) {
  const [result] = await pool.query(
    "UPDATE auth_tokens SET used_at = NOW() WHERE token = ?",
    [token]
  );
  return result.affectedRows > 0;
}

module.exports = {
  createToken,
  findToken,
  markTokenUsed,
};
