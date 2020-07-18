const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCoursesInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.course_name = !isEmpty(data.course_name) ? data.course_name : "";
  // Courses checks
  if (Validator.isEmpty(data.course_name)) {
    errors.course_name = "Enter course name.";
  }
  // First Name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First Name field is required";
  }
  // Last Name checks
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Date Started Checks
  if (Validator.isEmpty(data.date_started)) {
    errors.date_started = "Enter date started.";
  }
  // Date Ended Checks
  if (Validator.isEmpty(data.expected_end_date)) {
    errors.expected_end_date = "Enter expected end date.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = function validateCoursesOutput(data) {
  let errors = {};
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "No courses registered for this email/user.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
