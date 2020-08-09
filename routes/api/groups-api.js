const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");

// Load Groups model
const Groups = require("../../models/groups");
const router = express.Router();

const Courses = require("../../models/courses");
var coursesAPI = require("./courses-api.js");
const validateWriteGroupsInputVar = require("../../validation/groups-api/writeGroups");
const validateEnrollGroupsInputVar = require("../../validation/groups-api/enrollGroups");
const validateWriteCoursesInputVar = require("../../validation/courses-api/writeCourses");


router.post("/writeGroups", auth, (req, res) => {
  const { errorsCourses, isValid } = validateWriteCoursesInputVar(req.body);
  // Groups Write validation
  const { errorsGroups, isValidGroups } = validateWriteGroupsInputVar(req.body);
  // Check validation
  if (!isValidGroups || !isValid) {
    return res.status(400).json(errorsGroups+errorsCourses);
  }
  var groupStored = false;
  var courseStored = false;
  var full_name = req.body.first_name + " " +req.body.last_name;
      const newGroup = new Groups({
        course_name: req.body.course_name,
        member_list_names: full_name + " ",
        member_list_emails: req.body.email + " ",
        course_link: req.body.course_link,
        date_started: req.body.date_started,
        expected_end_date: req.body.expected_end_date,
        assignments_list: req.body.assignments_list,
      });
      newGroup
        .save()
        .then(groupStored = true)
        .catch((err) => console.log(err));

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
              assignments_list: req.body.assignments_list,
            });
            newCourses
              .save()
              .then(courseStored = true)
              .catch((err) => console.log(err));
          }
        });
        res.json({result : "successful"});
});

router.post("/enrollGroups", auth, (req, res) => {
  const { errorsCourses, isValid } = validateWriteCoursesInputVar(req.body);
  const { errorsEnrollGroups, isValidEnrollGroups } = validateEnrollGroupsInputVar(req.body);
  var assignments_list_temp;
  var end_date ;
  if (!isValidEnrollGroups && !isValid) {
    return res.status(400).json(errorsEnrollGroups+errorsCourses);
  }
  Groups.find({ course_name: req.body.course_name }).then((course) => {
    if (!course) {
      return res
        .status(400)
        .json({ course: "Course Not Found" });
    }else{
      var names = course[0].member_list_names + req.body.first_name + " " +req.body.last_name;
      var emails = course[0].member_list_emails + req.body.email;
      Groups.updateOne({
            course_name: req.body.course_name,
        }, {
            $set: {
              member_list_names:names + " ",
              member_list_emails: emails + " ",
            }
        }, function(err, results) {
            console.log(results.result);
        });
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
          expected_end_date: course[0].expected_end_date,
          assignments_list: course[0].assignments_list,
        });
        newCourses
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      }
    });
  });
});


function GenerateUniqueID() {
  return Math.floor(Math.random() * 10000000000000001);
}


router.post("/search", auth, (req, res) => {
  let filter = new RegExp(req.body.search_text);
  Groups.find({ course_name: filter }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
