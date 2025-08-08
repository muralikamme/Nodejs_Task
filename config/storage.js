const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    // const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, file.originalname);
  }
});

let uploaded = multer({ storage: storage });
module.exports = uploaded