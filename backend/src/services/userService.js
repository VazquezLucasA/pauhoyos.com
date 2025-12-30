const bcrypt = require("bcryptjs");
const { pool } = require("../config/db");

const mapUser = (row) =>
  row
    ? {
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        dni: row.dni,
        email: row.email,
        passwordHash: row.password_hash,
        phone: row.phone,
        birthDate: row.birth_date,
        role: row.role,
        emailVerifiedAt: row.email_verified_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    : null;

async function findByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
  return mapUser(rows[0]);
}

async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
  return mapUser(rows[0]);
}

async function createUser(data) {
  const hash = await bcrypt.hash(data.password, 10);
  await pool.query(
    `INSERT INTO users (first_name, last_name, dni, email, phone, birth_date, password_hash, role)
     VALUES (?,?,?,?,?,?,?,?)`,
    [
      data.firstName,
      data.lastName,
      data.dni || null,
      data.email,
      data.phone || null,
      data.birthDate || null,
      hash,
      data.role || "CLIENT",
    ]
  );
  return findByEmail(data.email);
}

async function updatePassword(userId, newPassword) {
  const hash = await bcrypt.hash(newPassword, 10);
  await pool.query("UPDATE users SET password_hash = ? WHERE id = ?", [hash, userId]);
  return findById(userId);
}

async function updateProfile(userId, updates) {
  await pool.query(
    `UPDATE users SET first_name = COALESCE(?, first_name),
      last_name = COALESCE(?, last_name),
      phone = COALESCE(?, phone),
      birth_date = COALESCE(?, birth_date)
     WHERE id = ?`,
    [updates.firstName, updates.lastName, updates.phone, updates.birthDate || null, userId]
  );
  return findById(userId);
}

async function markEmailVerified(userId) {
  await pool.query("UPDATE users SET email_verified_at = NOW() WHERE id = ?", [userId]);
  return findById(userId);
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updatePassword,
  updateProfile,
  markEmailVerified,
};
