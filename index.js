const express = require("express");
const mongoose = require("mongoose");
const userHandler = require("./routerHandler/userHandler");
const imageHandler = require("./routerHandler/imageHandler");
const cors = require("cors");

// express initialization
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// database connection with mongodb
mongoose
  .connect(
    "mongodb+srv://nur42658:nuraalam1234@cluster0.vihvh.mongodb.net/XpeedStudio?retryWrites=true&w=majority"
  )
  .then(() => console.log("connection successfully!"))
  .catch((err) => console.log(err));

// home page
app.get("/", (req, res) => {
  res.send("This is home page");
});

// user router
app.use("/user", userHandler);
// image upload
app.use("/image/upload", imageHandler);

app.listen(5000, () => {
  console.log("Listen port 5000");
});
