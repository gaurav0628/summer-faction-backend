const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GroupSchema = new Schema({
  course_name: {
    type: String,
    required: true,
  },
  member_list_names: {
    type: String,
    required: true,
  },
  member_list_emails: {
    type: String,
    required: true,
  },
  course_link: {
    type: String,
    required: true,
  },
  date_started: {
    type: Date,
    required: Date.now,
  },
  expected_end_date: {
    type: Date,
    required: Date.now,
  },
  assignments_list: {
    type: String,
    required: true,
  },
});
module.exports = Groups = mongoose.model("groups", GroupSchema);
