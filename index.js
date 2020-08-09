const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/user");

const config = require("./config/keys");

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

//!
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      userData,
    });
  });
});

//! Deploy App on localhost
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(`App deployed successfully at http://localhost:${PORT}`)
);
