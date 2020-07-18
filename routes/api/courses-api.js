const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateCoursesInput = require("../../validation/course-validation");
const validateCoursesOutput = require("../../validation/course-validation");

// Load courses model
const Courses = require("../../models/courses");

//get method
router.post("/getCourses", (req, res) => {
  const { errors, isValid } = validateCoursesOutput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  Courses.findOne({
    email: req.body.email,
  }).then((courses) => {
      res.json(courses);
  }).catch((err) => console.log(err));
});

//write method
router.post("/writeCourses", (req, res) => {
  // Courses Search validation
  const { errors, isValid } = validateCoursesInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Courses.findOne({
    email: req.body.email,
    course_name: req.body.course_name,
  }).then((courses) => {
    if (courses) {
      return res
        .status(400)
        .json({ courses: "User is already registered for this course." });
    } else {
      const id_value = GenerateUniqueID();
      const newCourses = new Courses({
        id: id_value.toString(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        date_started: req.body.date_started,
        course_name: req.body.course_name,
        status: keys.status_TO_DO,
        expected_end_date: req.body.expected_end_date,
      });
      newCourses
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    }
  });
});
function GenerateUniqueID() {
  return Math.floor(Math.random() * 10000000000000001);
}

module.exports = router;
