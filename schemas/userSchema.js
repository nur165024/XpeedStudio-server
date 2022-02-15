const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  calculateTitle: {
    type: String,
    require: true,
  },
  calculateNumber: {
    type: Number,
    require: true,
  },
  filePath: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = todoSchema;
