const express = require("express");

const { getProfile, updateProfile } = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const validate = require("../middleware/validate");

const { updateProfileSchema } = require("../validators/authValidator");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.patch("/profile", protect, validate(updateProfileSchema), updateProfile);

module.exports = router;
