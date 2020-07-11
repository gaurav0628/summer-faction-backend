const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CourseSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date_started: {
    type: Date,
    default: Date.now,
  },
  course_name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  expected_end_date: {
    type: Date,
    required: Date.now,
  },
});
module.exports = Courses = mongoose.model("courses", courseSchema);
