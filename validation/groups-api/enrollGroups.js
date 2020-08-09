const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEnrollGroupsInput(data) {
  let errorsEnrollGroups = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.course_name = !isEmpty(data.course_name) ? data.course_name : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.date_started = !isEmpty(data.date_started) ? data.date_started : "";

  // Courses checks
  if (Validator.isEmpty(data.course_name)) {
    errorsEnrollGroups.course_name = "Course Name field is required.";
  }
  // First Name checks
  if (Validator.isEmpty(data.first_name)) {
    errorsEnrollGroups.first_name = "First Name field is required";
  }
  // Last Name checks
  if (Validator.isEmpty(data.last_name)) {
    errorsEnrollGroups.last_name = "Last Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errorsEnrollGroups.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errorsEnrollGroups.email = "Email is invalid";
  }
  // Date Started Checks
  if (Validator.isEmpty(data.date_started)) {
    errorsEnrollGroups.date_started = "Enter date started.";
  }
  return {
    errorsEnrollGroups,
    isValidEnrollGroups: isEmpty(errorsEnrollGroups),
  };
};
