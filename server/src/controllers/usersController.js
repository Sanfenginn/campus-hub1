const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const createNewErrors = require("../utils/createNewErrors");
const checkResource = require("../utils/checkResource");
const TeacherModel = require("../models/teacherModel");
const StudentModel = require("../models/studentModel");
const RoleModel = require("../models/roleModel");
const moment = require("moment");

const addUser = async (req, res, next) => {
  const users = req.body;

  try {
    // Step 1: Hash passwords
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const dob = new Date(Date.parse(user.dob.split("T")[0]));
        console.log("dob", dob);
        const role = await RoleModel.findOne({
          role: user.role.userType,
        }).exec();
        return {
          ...user,
          password: hashedPassword,
          role: {
            ...user.role,
            roleInfo: role._id,
          },
          dob: dob,
        };
      })
    );

    // Step 2: Insert users with hashed passwords
    const newUsers = await UserModel.insertMany(usersWithHashedPasswords);

    // Step 3: Create related student or teacher documents
    const createRelatedDocs = newUsers.map(async (user) => {
      let relatedDoc;
      if (user.role.userType === "teacher") {
        relatedDoc = await TeacherModel.create({
          name: user.name,
          userId: user._id,
        });
      } else if (user.role.userType === "student") {
        relatedDoc = await StudentModel.create({
          name: user.name,
          userId: user._id,
        });
      }

      return { userId: user._id, relatedDocId: relatedDoc._id };
    });

    const relatedDocs = await Promise.all(createRelatedDocs);

    // Step 4: Update users with the related document IDs
    const updateUsers = relatedDocs.map(({ userId, relatedDocId }) =>
      UserModel.findByIdAndUpdate(userId, { "role.userId": relatedDocId })
    );

    await Promise.all(updateUsers);

    res.formatResponse(201, newUsers);
  } catch (err) {
    next(err);
  }
};

const bulkDeleteUserById = async (req, res, next) => {
  const { ids } = req.body;
  console.log("ids", ids);

  try {
    const deletedUsers = await UserModel.deleteMany({
      _id: { $in: ids },
    }).exec();

    checkResource(deletedUsers, "User not found", 404, "notFound", next);

    res.formatResponse(204);
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

    const allUsers = await UserModel.find(query).select("-password").exec();

    console.log("allUsers", allUsers);

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
  bulkDeleteUserById,
  updateUserById,
  getAllUsers,
  getUserById,
};
