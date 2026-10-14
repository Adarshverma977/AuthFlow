const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Read JWT from the HTTP-only cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    // 2. Verify the token's signature and expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find the user associated with this token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User associated with this token no longer exists.",
      });
    }

    // 4. Attach the authenticated user to the request
    req.user = user;

    // 5. Continue to the protected route
    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    next(error);
  }
};

module.exports = { protect };
