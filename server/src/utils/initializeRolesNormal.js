const mongoose = require("mongoose");
const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel");
const config = require("../config");

async function seedRolesAndPermissions() {
  try {
    await mongoose.connect(config.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 增加超时时间
      socketTimeoutMS: 45000,
    });

    console.log("Connected to MongoDB");

    // 假设已经插入权限到 Permission 集合，并获取它们的 _id
    const permissions = [
      "manage_users_add",
      "manage_users_delete",
      "manage_users_edit",
      "manage_users_view",
      "manage_classes_add",
      "manage_classes_delete",
      "manage_classes_edit",
      "manage_classes_view",
      "manage_courses_add",
      "manage_courses_delete",
      "manage_courses_edit",
      "manage_courses_view",
      "manage_teacher_courses_view",
      "manage_teacher_courses_add",
      "manage_teacher_courses_delete",
      "manage_teacher_courses_edit",
      "view_reports",
      "view_own_courses",
      "view_own_courses_content",
      "manage_course_students_add",
      "manage_course_students_remove",
      "view_course_students",
      "view_own_info",
      "edit_own_info",
      "view_course_content",
    ];

    const permissionObjects = await Permission.insertMany(
      permissions.map((permission) => ({ permission }))
    );

    const permissionsMap = {};
    permissionObjects.forEach((permission) => {
      permissionsMap[permission.permission] = permission._id;
    });

    await Role.insertMany([
      {
        role: "admin",
        permissions: [
          permissionsMap["manage_users_add"],
          permissionsMap["manage_users_delete"],
          permissionsMap["manage_users_edit"],
          permissionsMap["manage_users_view"],
          permissionsMap["manage_classes_add"],
          permissionsMap["manage_classes_delete"],
          permissionsMap["manage_classes_edit"],
          permissionsMap["manage_classes_view"],
          permissionsMap["manage_courses_add"],
          permissionsMap["manage_courses_delete"],
          permissionsMap["manage_courses_edit"],
          permissionsMap["manage_courses_view"],
          permissionsMap["manage_teacher_courses_view"],
          permissionsMap["manage_teacher_courses_add"],
          permissionsMap["manage_teacher_courses_delete"],
          permissionsMap["manage_teacher_courses_edit"],
          permissionsMap["view_reports"],
        ],
      },
      {
        role: "teacher",
        permissions: [
          permissionsMap["view_own_courses"],
          permissionsMap["view_own_courses_content"],
          permissionsMap["manage_course_students_add"],
          permissionsMap["manage_course_students_remove"],
          permissionsMap["view_course_students"],
          permissionsMap["view_own_info"],
          permissionsMap["edit_own_info"],
        ],
      },
      {
        role: "student",
        permissions: [
          permissionsMap["view_own_courses"],
          permissionsMap["view_course_content"],
          permissionsMap["view_own_info"],
          permissionsMap["edit_own_info"],
        ],
      },
    ]);

    console.log("Roles and permissions seeded successfully!");
  } catch (err) {
    console.error("Error seeding roles and permissions: ", err);
  } finally {
    mongoose.connection.close();
  }
}

// 执行函数
seedRolesAndPermissions().catch((err) => console.log(err));
