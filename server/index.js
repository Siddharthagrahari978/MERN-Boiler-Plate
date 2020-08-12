const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/user");

const config = require("./config/keys");

const { auth } = require("./middleware/auth");

//! Mongoose connecting to MongoDB Database
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.error(err));

//! Sending result for requesting with "/"
app.get("/", (req, res) => {
  res.send("Hello World");
});

//!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//! MiddleWare Authentication
app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

//! Route to register function
app.post("/api/users/register", auth, (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, userData: doc });
  });
});

//! Route to login function
app.post("/api/user/login", (req, res) => {
  // find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth Failed, Email not found",
      });
    }
    // compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: `There is somthing wwrong with password ${err}`,
        });
      }
      // generate token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true });
      });
    });
  });
});

//! Route to logout function
app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true, doc });
  });
});

//! Deploy App on localhost
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(`App deployed successfully at http://localhost:${PORT}`)
);
