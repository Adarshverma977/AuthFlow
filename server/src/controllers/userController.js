const sendResponse = require("../utils/sendResponse");

const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    return sendResponse(res, 200, "Profile fetched successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.validatedBody;

    req.user.name = name;

    const updatedUser = await req.user.save();

    return sendResponse(res, 200, "Profile updated successfully", {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
