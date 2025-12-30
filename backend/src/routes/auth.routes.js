const express = require("express");
const authController = require("../controllers/authController");
const { validate } = require("../middlewares/validate");
const { registerSchema, loginSchema, forgotSchema, resetSchema } = require("../validators/authValidators");
const { requireSession } = require("../middlewares/authGuard");

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.get("/confirm-email", authController.confirmEmail);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", requireSession, authController.logout);
router.post("/forgot-password", validate(forgotSchema), authController.forgotPassword);
router.post("/reset-password", validate(resetSchema), authController.resetPassword);
router.get("/me", requireSession, authController.me);

module.exports = router;
