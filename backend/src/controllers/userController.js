const userService = require("../services/userService");

async function updateMe(req, res, next) {
  try {
    const updates = req.body;
    const user = await userService.updateProfile(req.user.id, updates);
    const { passwordHash, ...rest } = user;
    res.json({ user: rest });
  } catch (err) {
    next(err);
  }
}

module.exports = { updateMe };
