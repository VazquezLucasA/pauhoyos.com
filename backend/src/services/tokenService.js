const dayjs = require("dayjs");
const { randomUUID } = require("crypto");
const { pool } = require("../config/db");
const { tokenConfig } = require("../config/env");

async function createEmailVerificationToken(userId) {
  const token = randomUUID();
  const expiresAt = dayjs().add(tokenConfig.verifyTtlHours, "hour").toDate();
  await pool.query(
    "INSERT INTO email_verification_tokens (token, user_id, expires_at) VALUES (?,?,?)",
    [token, userId, expiresAt]
  );
  return token;
}

async function useEmailVerificationToken(token) {
  const [rows] = await pool.query(
    "SELECT * FROM email_verification_tokens WHERE token = ? LIMIT 1",
    [token]
  );
  const existing = rows[0];
  if (!existing) return null;
  const now = new Date();
  if (existing.used_at || new Date(existing.expires_at) <= now) return null;

  await pool.query("UPDATE email_verification_tokens SET used_at = NOW() WHERE token = ?", [token]);
  return existing.user_id;
}

async function createPasswordResetToken(userId) {
  const token = randomUUID();
  const expiresAt = dayjs().add(tokenConfig.resetTtlMinutes, "minute").toDate();
  await pool.query(
    "INSERT INTO password_reset_tokens (token, user_id, expires_at) VALUES (?,?,?)",
    [token, userId, expiresAt]
  );
  return token;
}

async function usePasswordResetToken(token) {
  const [rows] = await pool.query(
    "SELECT * FROM password_reset_tokens WHERE token = ? LIMIT 1",
    [token]
  );
  const existing = rows[0];
  if (!existing) return null;
  const now = new Date();
  if (existing.used_at || new Date(existing.expires_at) <= now) return null;

  await pool.query("UPDATE password_reset_tokens SET used_at = NOW() WHERE token = ?", [token]);
  return existing.user_id;
}

module.exports = {
  createEmailVerificationToken,
  useEmailVerificationToken,
  createPasswordResetToken,
  usePasswordResetToken,
};
