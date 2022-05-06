const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profil");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype !== "image/png" ||
      file.mimetype !== "image/jpg" ||
      file.mimetype !== "image.jpeg"
    ) {
      console.log("Only png, jpg, jpeg");
      callback(null, false);
    } else {
      callback(null, true);
    }
  },
  limits: {
    fileSize: 500000,
  },
});

module.exports = upload;
