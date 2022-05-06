const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/profil");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + file.originalname.toLowerCase().split(" ").join("-"));
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
module.exports.uploadImg = async (req, res) => {
  try {
    const upload = await multer({ storage: storage, fileFilter: fileFilter });
    upload.single("image");
    res.send("toto");
  } catch (error) {
    return res.send(error);
  }
};
