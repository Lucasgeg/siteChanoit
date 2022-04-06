const router = require("express").Router();
const missionController = require("../controllers/mission.controller");

//mission db
router.get("/", missionController.getAllMission);
router.post("/", missionController.createMission);
router.get("/:id", missionController.missionInfo);
router.patch("/:id", missionController.missionUpdate);
router.delete("/:id", missionController.missionDelete);

//employees on it
router.patch("/add-employee/:id", missionController.addEmployee);
router.patch("/edit-employee/:id", missionController.editEmployeeMission);
router.patch(
  "/delete-employee-mission/:id",
  missionController.deleteEmployeeMission
);

module.exports = router;
