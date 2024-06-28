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
  classRoom: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.base": `"classRoom" should be a type of 'text'`,
      "string.empty": `"classRoom" cannot be an empty field`,
    })
    .optional(),
  classSchedule: Joi.object({
    week: Joi.string()
      .min(1)
      .max(255)
      .messages({
        "string.base": `"week" should be a type of 'text'`,
        "string.empty": `"week" cannot be an empty field`,
      })
      .optional(),
    time: Joi.object({
      startTime: Joi.string().min(1).max(255).messages({
        "string.base": `"startTime" should be a type of 'text'`,
        "string.empty": `"startTime" cannot be an empty field`,
      }),
      endTime: Joi.string()
        .min(1)
        .max(255)
        .messages({
          "string.base": `"endTime" should be a type of 'text'`,
          "string.empty": `"endTime" cannot be an empty field`,
        })
        .optional(),
    }).messages({
      "object.base": `"time" should be an object`,
    }),
  }).messages({
    "object.base": `"classSchedule" should be an object`,
  }),

  teacher: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": `"teacher" should be a valid ObjectId`,
    })
    .optional(),
  studentClasses: Joi.array().items(
    Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"class" should be a valid ObjectId`,
      })
      .optional()
  ),
});

module.exports = courseSchema;
