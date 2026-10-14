const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// Health-check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AuthFlow API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handler must remain after routes
app.use(errorHandler);

module.exports = app;
