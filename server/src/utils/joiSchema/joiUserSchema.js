const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string()
      .min(1)
      .max(255)
      .messages({
        "string.base": `"firstName" should be a type of 'text'`,
        "string.empty": `"firstName" cannot be an empty field`,
        "string.min": `"firstName" should have a minimum length of {#limit}`,
        "string.max": `"firstName" should have a maximum length of {#limit}`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    lastName: Joi.string()
      .min(1)
      .max(255)
      .messages({
        "string.base": `"lastName" should be a type of 'text'`,
        "string.empty": `"lastName" cannot be an empty field`,
        "string.min": `"lastName" should have a minimum length of {#limit}`,
        "string.max": `"lastName" should have a maximum length of {#limit}`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
  }).when("$isUpdate", {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  account: Joi.string()
    .messages({
      "string.base": `"account" should be a type of 'text'`,
      "string.empty": `"account" cannot be an empty field`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  password: Joi.string()
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  role: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": `"role" should be a valid ObjectId`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  contact: Joi.object({
    email: Joi.string()
      .email()
      .messages({
        "string.email": `"email" must be a valid email`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    phone: Joi.string()
      .pattern(/^\+\d{10,15}$/)
      .messages({
        "string.pattern.base": `"phone" should be a valid phone number with country code`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
  }).when("$isUpdate", {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  address: Joi.object({
    road: Joi.string()
      .messages({
        "string.base": `"road" should be a type of 'text'`,
        "string.empty": `"road" cannot be an empty field`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    city: Joi.string()
      .messages({
        "string.base": `"city" should be a type of 'text'`,
        "string.empty": `"city" cannot be an empty field`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    state: Joi.string()
      .messages({
        "string.base": `"state" should be a type of 'text'`,
        "string.empty": `"state" cannot be an empty field`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    postalCode: Joi.string()
      .pattern(/^\d{4,8}$/)
      .messages({
        "string.pattern.base": `"postalCode" should be a 4 to 8 digit number`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
  }).when("$isUpdate", {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
});

module.exports = userSchema;
