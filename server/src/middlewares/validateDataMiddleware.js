const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      errors.array()
    );
    return next(err);
  } else {
    next();
  }
};

module.exports = validation;
