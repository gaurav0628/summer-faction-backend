const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateWriteGroupsInput(data) {
  let errorsGroups = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.course_name = !isEmpty(data.course_name) ? data.course_name : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.date_started = !isEmpty(data.date_started) ? data.date_started : "";
  data.expected_end_date = !isEmpty(data.expected_end_date) ? data.expected_end_date : "";
  data.assignments_list = !isEmpty(data.assignments_list) ? data.assignments_list : "";
  data.course_link = !isEmpty(data.course_link) ? data.course_link : "";
  // Courses checks
  if (Validator.isEmpty(data.course_name)) {
    errorsGroups.course_name = "Course Name field is required.";
  }
  // First Name checks
  if (Validator.isEmpty(data.first_name)) {
    errorsGroups.first_name = "First Name field is required";
  }
  // Last Name checks
  if (Validator.isEmpty(data.last_name)) {
    errorsGroups.last_name = "Last Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errorsGroups.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errorsGroups.email = "Email is invalid";
  }
  // Date Started Checks
  if (Validator.isEmpty(data.date_started)) {
    errorsGroups.date_started = "Enter date started.";
  }
  // Date Ended Checks
  if (Validator.isEmpty(data.expected_end_date)) {
    errorsGroups.expected_end_date = "Enter date started.";
  }
  // Assignments list check
  if (Validator.isEmpty(data.assignments_list)) {
    errorsGroups.assignments_list = "Enter expected end date.";
  }
  // Course Links Checks
  if (Validator.isEmpty(data.course_link)) {
    errorsGroups.course_link = "Enter expected end date.";
  }
  return {
    errorsGroups,
    isValidGroups: isEmpty(errorsGroups),
  };
};
