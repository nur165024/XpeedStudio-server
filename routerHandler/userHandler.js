const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const router = express.Router();
const User = new mongoose.model("User", userSchema);

// get all user
router.get("/", async (req, res) => {
  await User.find({})
    .limit(req.query.limit)
    .sort({ date: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});

// post user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save((err) => {
    if (err) {
      res.status(500).json({
        status: false,
        error: "There was a server side error",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User was inserted successfully!",
      });
    }
  });
});

module.exports = router;
