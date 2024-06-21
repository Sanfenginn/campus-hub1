const Joi = require("joi");

const courseSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.empty": `"name" cannot be an empty field`,
      "string.min": `"name" should have a minimum length of {#limit}`,
      "string.max": `"name" should have a maximum length of {#limit}`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  description: Joi.string()
    .min(1)
    .max(1000)
    .messages({
      "string.base": `"description" should be a type of 'text'`,
      "string.empty": `"description" cannot be an empty field`,
      "string.min": `"description" should have a minimum length of {#limit}`,
      "string.max": `"description" should have a maximum length of {#limit}`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  teacher: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": `"teacher" should be a valid ObjectId`,
    }),
  // .when("$isUpdate", {
  //   is: true,
  //   then: Joi.optional(),
  //   otherwise: Joi.required(),
  // }),
  classes: Joi.array().items(
    Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"class" should be a valid ObjectId`,
      })
  ),
});

module.exports = courseSchema;
