const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// file upload folder
const UPLOADS_FOLDER = "./uploads/";

// define the store
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    // important file => important-file-5454455.jpg / png / jpeg
    const fileExn = path.extname(file.originalname);

    const fileName =
      file.originalname
        .replace(fileExn, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExn);
  },
});

// final upload multer object
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/plain") {
      cb(null, true);
    } else {
      cb(new Error("Only .txt format allowed!"));
    }
  },
});

// file upload
router.post("/", upload.single("file"), (req, res) => {
  const fileRead = fs.readFileSync(req.file.path, "utf-8");
  const calculateNumber = eval(fileRead);
  const filePath = req.file.path;

  const data = {
    calculateNumber: calculateNumber,
    filePath: filePath,
  };

  res.send({
    message: "File upload successfully!",
    data: data,
  });
});

// error handle
router.use((err, req, res, next) => {
  if (err) {
    res.send(err.message);
  } else {
    res.send("success!");
  }
});

module.exports = router;
