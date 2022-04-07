const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

//quand la route est api/user/register
router.post("/register", authController.signUp); //quand on fait cette route, on déclenche dans le fichier authController la fonction signUp

//userDB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.patch("/:id", userController.userUpdate);
router.delete("/:id", userController.deleteUser);
router.get("/hours/:id", userController.time);

module.exports = router;
