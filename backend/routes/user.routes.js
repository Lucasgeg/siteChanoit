const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

//quand la route est api/user/register
router.post("/register", authController.signUp); //quand on fait cette route, on déclenche dans le fichier authController la fonction signUp
router.post("/login", authController.signIn);

router.get("/logout", authController.logout);
//userDB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.patch("/:id", userController.userUpdate);
router.delete("/:id", userController.deleteUser);
router.get("/hours/:id", userController.time);

//upload

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads/profil");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.toLowerCase().split(" ").join("-") + Date.now() + ".jpg"
    );
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
    console.log("invalid file type");
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
router.post("/upload", upload.single("image"), (req, res) => {
  const user = req.body.name;
  try {
    return res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
