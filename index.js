const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//! Mongoose connecting to MongoDB Database
mongoose
  .connect(
    "mongodb+srv://node-app:node-app978@node-applications-data.4s7nb.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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

//! Deploy App on localhost
const PORT = 5000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(`App deployed successfully at http://localhost:${PORT}`)
);
