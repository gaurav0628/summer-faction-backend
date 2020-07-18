const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/user-api");
const courses = require("./routes/api/courses-api");

const app = express();
// Bodyparser middleware for json
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// Get mongoDB url from keys.js file
const db = require("./config/keys").mongoURI || process.env.MONGODB_URI;
// MongoDB Connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/user-api", users);
app.use("/api/courses-api", courses);

const port = process.env.PORT || 5000; // process.env.port for Heroku and 5000 for local
app.listen(port, () =>
  console.log(`Server started successfully on port ${port} !`)
);
