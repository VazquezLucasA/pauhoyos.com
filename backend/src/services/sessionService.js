const dayjs = require("dayjs");
const { pool } = require("../config/db");
const { sessionConfig } = require("../config/env");
const { findById: findUserById } = require("./userService");

async function createSession(userId, { ip, userAgent } = {}) {
  const expiresAt = dayjs().add(sessionConfig.ttlHours, "hour").toDate();
  await pool.query(
    "INSERT INTO sessions (user_id, expires_at, ip, user_agent) VALUES (?,?,?,?)",
    [userId, expiresAt, ip || null, userAgent || null]
  );
  const [rows] = await pool.query(
    "SELECT id, user_id as userId, expires_at as expiresAt, ip, user_agent as userAgent FROM sessions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1",
    [userId]
  );
  return rows[0];
}

async function validateSession(sessionId) {
  if (!sessionId) return null;
  const [rows] = await pool.query(
    "SELECT id, user_id as userId, expires_at as expiresAt, ip, user_agent as userAgent FROM sessions WHERE id = ? LIMIT 1",
    [sessionId]
  );
  const session = rows[0];
  if (!session) return null;
  const now = new Date();
  if (new Date(session.expiresAt) <= now) {
    await pool.query("DELETE FROM sessions WHERE id = ?", [sessionId]);
    return null;
  }
  const user = await findUserById(session.userId);
  if (!user) {
    await pool.query("DELETE FROM sessions WHERE id = ?", [sessionId]);
    return null;
  }
  return { ...session, user };
}

async function deleteSession(sessionId) {
  await pool.query("DELETE FROM sessions WHERE id = ?", [sessionId]);
}

async function deleteUserSessions(userId) {
  await pool.query("DELETE FROM sessions WHERE user_id = ?", [userId]);
}

module.exports = {
  createSession,
  validateSession,
  deleteSession,
  deleteUserSessions,
};
