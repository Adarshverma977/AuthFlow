const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== null && { data }),
  });
};

module.exports = sendResponse;
