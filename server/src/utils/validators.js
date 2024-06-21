// validators.js
const { body, param } = require("express-validator");

const postListsValidationRules = [
  body("data.name")
    .notEmpty() //检查是否为空
    .withMessage("name is required")
    .isLength({ min: 1 }) //检查长度
    .withMessage("Name must be at least 1 character long"),
  body("data.completed")
    .optional()
    .exists() //检查是否存在
    .withMessage("completed is required")
    .isBoolean() //判断是否为布尔值
    .withMessage("Completed must be a boolean"),
];

const idValidationRules = body("data.id")
  .exists({ checkFalsy: true }) //检查是否存在，如果字段的值是这些 “falsy” 值之一，则验证将失败。
  .withMessage("ID is required")
  .bail() //如果前一个验证器失败，则停止验证链
  .isNumeric() //判断是否为数字
  .withMessage("ID must be a number");

const updateListsValidationRules = [
  idValidationRules,
  ...postListsValidationRules,
];

const getAndDeleteListValidationRules = [
  param("id")
    .exists()
    .withMessage("ID is required")
    .bail()
    .isNumeric()
    .withMessage("ID must be a number"),
];

module.exports = {
  updateListsValidationRules,
  getAndDeleteListValidationRules,
  postListsValidationRules,
};

//{ checkFalsy: true }将 “falsy” 值（如空字符串 ''、null、undefined、false、0 和 NaN）也视为不存在。这意味着如果字段的值是这些 “falsy” 值之一，则验证将失败。
