const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const createNewErrors = require("../utils/createNewErrors");
const checkResource = require("../utils/checkResource");

const addUser = async (req, res, next) => {
  const users = req.body;

  try {
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );

    // 插入带有加密密码的用户
    const newUser = await UserModel.insertMany(usersWithHashedPasswords);
    res.formatResponse(201, newUser);
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id).exec();

    checkResource(deletedUser, "User not found", 404, "notFound", next);

    res.formatResponse(204, deletedUser);
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    // 如果存在密码字段，则加密密码
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: userData },
      { new: true }
    ).exec();

    checkResource(updatedUser, "User not found", 404, "notFound", next);

    res.formatResponse(200, updatedUser);
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  const { condition, inputValue } = req.query;
  console.log("condition", condition);
  console.log("inputValue", inputValue);

  try {
    const regex = new RegExp(`^${inputValue}$`, "i"); // 'i' 表示不区分大小写
    // 构建查询对象
    let query = { "name.firstName": { $ne: "Admin" } };
    if (condition && inputValue) {
      if (condition === "Name") {
        query = {
          $or: [{ "name.firstName": regex }, { "name.lastName": regex }],
        };
      } else {
        query[condition.toLowerCase()] = inputValue;
      }
    }

    console.log("query", query);

    const allUsers = await UserModel.find(query)
      .select("-password -role")
      .exec();

    if (allUsers.length === 0) {
      const err = createNewErrors("No users found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allUsers);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id).exec();

    checkResource(user, "User not found", 404, "notFound", next);

    res.formatResponse(200, user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addUser,
  deleteUserById,
  updateUserById,
  getAllUsers,
  getUserById,
};
