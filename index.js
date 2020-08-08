const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://node-app:node-app978@node-applications-data.4s7nb.mongodb.net/<dbname>?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB Connected..."))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(`App deployed successfully at http://localhost:${PORT}`)
);
