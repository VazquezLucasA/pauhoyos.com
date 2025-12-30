const verificationEmail = ({ name, link }) => ({
  subject: "Confirma tu cuenta",
  html: `
    <p>Hola ${name || ""},</p>
    <p>Gracias por registrarte. Confirma tu correo haciendo click en el siguiente enlace:</p>
    <p><a href="${link}" target="_blank" rel="noopener">Confirmar cuenta</a></p>
    <p>Si no solicitaste esto, ignora este mensaje.</p>
  `,
});

const resetPasswordEmail = ({ name, link }) => ({
  subject: "Restablecer contraseña",
  html: `
    <p>Hola ${name || ""},</p>
    <p>Recibimos una solicitud para restablecer tu contraseña. Completa el proceso aquí:</p>
    <p><a href="${link}" target="_blank" rel="noopener">Restablecer contraseña</a></p>
    <p>Si no solicitaste esto, ignora este mensaje.</p>
  `,
});

module.exports = { verificationEmail, resetPasswordEmail };
