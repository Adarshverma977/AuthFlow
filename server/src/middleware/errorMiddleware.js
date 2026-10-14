const errorHandler = (err, req, res, next) => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  // If response has already started, delegate to Express
  if (res.headersSent) {
    return next(err);
  }

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // MongoDB duplicate-key error
  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with this value already exists";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database validation failed";
  }

  // Invalid MongoDB document ID
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier";
  }

  // Hide internal details from clients in production
  if (statusCode >= 500 && process.env.NODE_ENV === "production") {
    message = "Internal server error";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" &&
      statusCode >= 500 && { stack: err.stack }),
  });
};

module.exports = errorHandler;
