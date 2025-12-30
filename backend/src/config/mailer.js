const nodemailer = require("nodemailer");
const { mailConfig } = require("./env");

const transporter = nodemailer.createTransport({
  host: mailConfig.host,
  port: mailConfig.port,
  secure: mailConfig.secure,
  auth: {
    user: mailConfig.user,
    pass: mailConfig.pass,
  },
  tls: {
    minVersion: "TLSv1.2",
  },
});

module.exports = { transporter };
