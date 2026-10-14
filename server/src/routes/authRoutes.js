const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { authLimiter } = require("../middleware/rateLimitMiddleware");

const {
  registerSchema,
  loginSchema,
} = require("../validators/authValidator");

const router = express.Router();

// Public authentication routes
router.post(
  "/register",
  authLimiter,
  validate(registerSchema),
  registerUser,
);

router.post(
  "/login",
  authLimiter,
  validate(loginSchema),
  loginUser,
);

// Protected authentication routes
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getCurrentUser);

module.exports = router;
