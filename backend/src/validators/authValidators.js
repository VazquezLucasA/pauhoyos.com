const { z } = require("zod");

const optionalString = z.preprocess((val) => {
  if (val === null || val === undefined) return undefined;
  if (typeof val === "string" && val.trim() === "") return undefined;
  return val;
}, z.string().trim());

const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Nombre completo requerido"),
    dni: optionalString.optional(),
    email: z.string().email(),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    phone: optionalString.optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

const forgotSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

const resetSchema = z
  .object({
    body: z.object({
      password: z.string().min(8, "Mínimo 8 caracteres"),
    }),
    query: z.object({
      token: z.string().min(10, "Token inválido"),
    }),
  });

module.exports = {
  registerSchema,
  loginSchema,
  forgotSchema,
  resetSchema,
};
