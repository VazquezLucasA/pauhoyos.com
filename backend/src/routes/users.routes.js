const express = require("express");
const { requireSession } = require("../middlewares/authGuard");
const userController = require("../controllers/userController");

const router = express.Router();

router.put("/me", requireSession, userController.updateMe);

module.exports = router;
