const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const upload = require("../../middlewares/upload");

const { schemas } = require("../../models/users");

const verifyToken = require("../../controllers/verifyToken");

const router = express.Router();

// singup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.get("/verify/:verificationToken", ctrl.verifyToken);

module.exports = router;
