const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDropCoursesInput(data) {
  let errors = {};
  // Email checks
  data.email = !isEmpty(data.email) ? data.email : "";
  data.course_name = !isEmpty(data.course_name) ? data.course_name : "";
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid email.";
  }

  if (Validator.isEmpty(data.course_name)) {
    errors.course_name = "Course Name field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
