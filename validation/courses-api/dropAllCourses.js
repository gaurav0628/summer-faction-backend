const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDropAllCoursesInput(data) {
  let errors = {};
  // Email checks
  data.email = !isEmpty(data.email) ? data.email : "";
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
