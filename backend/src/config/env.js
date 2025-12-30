require("dotenv/config");

const numberFromEnv = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const appConfig = {
  env: process.env.NODE_ENV || "development",
  port: numberFromEnv(process.env.APP_PORT, 4000),
  url: process.env.APP_URL || `http://localhost:${numberFromEnv(process.env.APP_PORT, 4000)}`,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: numberFromEnv(process.env.DB_PORT, 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pauhoyos",
};

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "change_me",
  cookieName: process.env.SESSION_COOKIE_NAME || "sid",
  ttlHours: numberFromEnv(process.env.SESSION_TTL_HOURS, 12),
};

const tokenConfig = {
  verifyTtlHours: numberFromEnv(process.env.VERIFY_TOKEN_TTL_HOURS, 24),
  resetTtlMinutes: numberFromEnv(process.env.RESET_TOKEN_TTL_MINUTES, 30),
};

const mailConfig = {
  host: process.env.SMTP_HOST || "smtp.zoho.com",
  port: numberFromEnv(process.env.SMTP_PORT, 465),
  secure:
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : numberFromEnv(process.env.SMTP_PORT, 465) === 465,
  user: process.env.SMTP_USER || "",
  pass: process.env.SMTP_PASS || "",
  from: process.env.MAIL_FROM || "no-reply@pauhoyos.com",
};

module.exports = {
  appConfig,
  dbConfig,
  sessionConfig,
  tokenConfig,
  mailConfig,
};
