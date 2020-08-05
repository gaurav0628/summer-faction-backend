const express = require("express");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");

// Load Groups model
const Groups = require("../../models/groups");

const router = express.Router();

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
