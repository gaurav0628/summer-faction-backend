const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");
// Load input validation
const validateWriteCoursesInputVar = require("../../validation/courses-api/writeCourses");
const validateCoursesInputVar = require("../../validation/courses-api/getCourses");
const validateDropCoursesInputVar = require("../../validation/courses-api/dropCourses");
const validateDropAllCoursesInputVar = require("../../validation/courses-api/dropAllCourses");

// Load courses model
const Courses = require("../../models/courses");

//get method
router.post("/getCourses", auth, (req, res) => {
  const { errors, isValid } = validateCoursesInputVar(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Courses.findOne({ email: req.body.email })
    .then((courses) => {
      if (courses) {
        res.json(courses);
      } else {
        res.json({ email: "No courses registered for the user" });
      }
    })
    .catch((err) => console.log(err));
});

//write method
router.post("/writeCourses", auth, (req, res) => {
  // Courses Search validation
  const { errors, isValid } = validateWriteCoursesInputVar(req.body);
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

//drop courses
router.post("/dropCourses", auth, (req, res) => {
  const { errors, isValid } = validateDropCoursesInputVar(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Courses.deleteOne({
    email: req.body.email,
    course_name: req.body.course_name,
  }).then((courses) => {
    if (courses.n == 1) {
      res.json({ courses: "Course deleted." });
    } else {
      return res.status(400).json({ courses: "Course not found." });
    }
  });
});

//drop all courses
router.post("/dropAllCourses", auth, (req, res) => {
  const { errors, isValid } = validateDropAllCoursesInputVar(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Courses.deleteMany({
    email: req.body.email,
  }).then((courses) => {
    if (courses.n >= 1 ) {
      res.json({ courses: "Deleted all courses.",
                  num_deletes: courses.n});
    } else {
      return res.status(400).json({ courses: "Course(s) not found." });
    }
  });
});

module.exports = router;
