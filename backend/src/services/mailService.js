const { transporter } = require("../config/mailer");
const { appConfig, mailConfig } = require("../config/env");
const templates = require("../utils/emailTemplates");

async function sendVerificationEmail({ to, name, token }) {
  const link = `${appConfig.frontendUrl}/confirm-email?token=${token}`;
  const { subject, html } = templates.verificationEmail({ name, link });
  return transporter.sendMail({
    from: mailConfig.from,
    to,
    subject,
    html,
  });
}

async function sendResetPasswordEmail({ to, name, token }) {
  const link = `${appConfig.frontendUrl}/reset-password?token=${token}`;
  const { subject, html } = templates.resetPasswordEmail({ name, link });
  return transporter.sendMail({
    from: mailConfig.from,
    to,
    subject,
    html,
  });
}

module.exports = { sendVerificationEmail, sendResetPasswordEmail };
