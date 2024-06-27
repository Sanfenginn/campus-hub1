const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const createNewErrors = require("../utils/createNewErrors");
const checkResource = require("../utils/checkResource");
const TeacherModel = require("../models/teacherModel");
const StudentModel = require("../models/studentModel");
const RoleModel = require("../models/roleModel");

const addUser = async (extraParam) => {
  const users = extraParam;

  console.log("开始添加用户", users);

  try {
    // Step 1: Hash passwords
    const usersWithHashedPasswords = await Promise.all(
      users.map(async (user) => {
        console.log("开始加密");
        const hashedPassword = await bcrypt.hash(user.password, 10);
        console.log("加密完成");
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

    console.log("newUsers", newUsers);

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
    // next(err);
    console.log("err", err);
  }
};

module.exports = {
  addUser,
};
