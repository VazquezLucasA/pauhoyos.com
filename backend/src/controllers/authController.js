const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");
const dayjs = require("dayjs");
const { appConfig, sessionConfig } = require("../config/env");
const usersModel = require("../models/usersModel");
const authTokensModel = require("../models/authTokensModel");
const sessionsModel = require("../models/sessionsModel");

const sanitizeUser = (user) => {
  if (!user) return null;
  const { password_hash, ...rest } = user;
  return rest;
};

async function register(req, res, next) {
  try {
    const { fullName, email, password, dni, phone } = req.validated.body;

    const existing = await usersModel.findUserByEmail(email);
    if (existing) return res.status(409).json({ error: "Email ya registrado" });

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = await usersModel.createUser({
      fullName,
      email,
      passwordHash,
      dni,
      phone,
      role: 'user'
    });

    const token = randomUUID();
    const expiresAt = dayjs().add(24, 'hour').toDate();

    await authTokensModel.createToken({
      userId,
      token,
      type: 'email_confirmation',
      expiresAt
    });

    // TODO: Enviar email real
    // eslint-disable-next-line no-console
    console.log(`URL de confirmación: ${appConfig.url}/api/auth/confirm-email?token=${token}`);

    res.status(201).json({ message: "Usuario creado. Revisa tu correo para confirmar." });
  } catch (err) {
    next(err);
  }
}

async function confirmEmail(req, res, next) {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Token requerido" });

    const tokenRecord = await authTokensModel.findToken(token);

    if (!tokenRecord) return res.status(400).json({ error: "Token inválido" });
    if (tokenRecord.type !== 'email_confirmation') return res.status(400).json({ error: "Tipo de token inválido" });
    if (tokenRecord.used_at) return res.status(400).json({ error: "Token ya utilizado" });
    if (new Date(tokenRecord.expires_at) < new Date()) return res.status(400).json({ error: "Token expirado" });

    await usersModel.markEmailVerified(tokenRecord.user_id);
    await authTokensModel.markTokenUsed(token);

    res.json({ message: "Email verificado correctamente" });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.validated.body;

    const user = await usersModel.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: "Credenciales inválidas" });

    if (!user.is_email_confirmed) {
      return res.status(403).json({ error: "Debes confirmar tu correo antes de iniciar sesión" });
    }

    if (!user.is_active) {
      return res.status(403).json({ error: "Usuario inactivo" });
    }

    const token = randomUUID();
    const expiresAt = dayjs().add(7, 'day').toDate(); // 7 días de sesión

    await sessionsModel.createSession({
      userId: user.id,
      token,
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
      expiresAt
    });

    res.cookie(sessionConfig.cookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: appConfig.env === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const token = req.cookies?.[sessionConfig.cookieName];
    if (token) {
      await sessionsModel.deleteSession(token);
    }
    res.clearCookie(sessionConfig.cookieName);
    res.json({ message: "Sesión cerrada" });
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const { email } = req.validated.body;
    const user = await usersModel.findUserByEmail(email);

    if (user && user.is_active) {
      const token = randomUUID();
      const expiresAt = dayjs().add(1, 'hour').toDate();

      await authTokensModel.createToken({
        userId: user.id,
        token,
        type: 'password_reset',
        expiresAt
      });

      // TODO: Enviar email real
      // eslint-disable-next-line no-console
      console.log(`URL de reset: ${appConfig.frontendUrl}/reset-password?token=${token}`);
    }

    // Siempre devolver el mismo mensaje, no revelar si el usuario existe
    res.json({ message: "Si el email existe, te enviamos instrucciones" });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { token } = req.query;
    const { password } = req.validated.body;

    const tokenRecord = await authTokensModel.findToken(token);

    if (!tokenRecord) return res.status(400).json({ error: "Token inválido" });
    if (tokenRecord.type !== 'password_reset') return res.status(400).json({ error: "Tipo de token inválido" });
    if (tokenRecord.used_at) return res.status(400).json({ error: "Token ya utilizado" });
    if (new Date(tokenRecord.expires_at) < new Date()) return res.status(400).json({ error: "Token expirado" });

    const passwordHash = await bcrypt.hash(password, 10);
    await usersModel.updatePassword(tokenRecord.user_id, passwordHash);
    await authTokensModel.markTokenUsed(token);

    // Cerrar todas las sesiones del usuario por seguridad
    await sessionsModel.deleteUserSessions(tokenRecord.user_id);

    res.json({ message: "Contraseña actualizada" });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  res.json({ user: sanitizeUser(req.user) });
}

module.exports = {
  register,
  confirmEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  me,
};
