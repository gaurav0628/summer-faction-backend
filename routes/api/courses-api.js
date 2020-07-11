const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

const Courses = require("../../models/courses");

router.post("/getCourses", (req, res) =>
  Courses.find({ first_name : req.body.first_name, last_name : req.body.last_name, email: req.body.email }).then((course) => {
    if(course){
      for(){

      }
    }else{
      return res
        .status(400)
        .json({ course_name: "Courses not found for the user." });
    }
  });
});

module.exports = router;
