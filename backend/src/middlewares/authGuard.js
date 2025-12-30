const { sessionConfig } = require("../config/env");
const sessionsModel = require("../models/sessionsModel");
const usersModel = require("../models/usersModel");

async function requireSession(req, res, next) {
  try {
    const token = req.cookies?.[sessionConfig.cookieName];
    if (!token) return res.status(401).json({ error: "No autorizado" });

    const session = await sessionsModel.findSessionByToken(token);
    if (!session) return res.status(401).json({ error: "Sesión inválida o expirada" });

    if (new Date(session.expires_at) < new Date()) {
      await sessionsModel.deleteSession(token);
      return res.status(401).json({ error: "Sesión expirada" });
    }

    const user = await usersModel.findUserById(session.user_id);
    if (!user || !user.is_active) {
      await sessionsModel.deleteSession(token);
      return res.status(401).json({ error: "Usuario no encontrado o inactivo" });
    }

    // Attach user info (excluding sensitive data)
    const { password_hash, ...safeUser } = user;
    req.user = safeUser;
    req.session = session;

    next();
  } catch (err) {
    next(err);
  }
}

const roleGuard = (roles = []) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "No autorizado" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Permiso denegado" });
  next();
};

module.exports = { requireSession, roleGuard };
