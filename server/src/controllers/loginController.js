const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const Role = require("../models/roleModel");
const createNewErrors = require("../utils/createNewErrors");
const config = require("../config");

const login = async (req, res, next) => {
  const { account, password } = req.body;

  try {
    const user = await UserModel.findOne({ account }).populate("role").exec();
    if (!user) {
      const err = createNewErrors("User not found", 404, "notFound");
      return next(err);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      const err = createNewErrors("Incorrect password", 401, "unauthorized");
      return next(err);
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role.role },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 将 token 存储在 HttpOnly cookies 中
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 在生产环境中使用 HTTPS
      maxAge: 3600000, // 1小时
    });

    res.formatResponse(200, "Login successful");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  // other functions
};
