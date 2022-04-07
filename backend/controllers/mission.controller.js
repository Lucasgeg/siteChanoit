const UserModel = require("../models/user.model");
const missionModel = require("../models/mission.model");
const { json } = require("body-parser");
const { findOne, findById, find, modelName } = require("../models/user.model");
const { use } = require("../routes/misson.routes");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllMission = (req, res) => {
  missionModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get missions: " + err);
    })
    .sort({ missionBeginDate: 1 });
};
module.exports.createMission = async (req, res) => {
  const newMission = new missionModel({
    ...req.body,
  });
  try {
    const mission = await newMission.save();
    return res.status(201).json(mission);
  } catch (error) {
    return res.status(400).send(error);
  }
};
module.exports.missionInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //params == parametre passé dans l'url
    return res.status(400).send("Unknow ID: " + req.params.id);
  missionModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Unknow Id: " + err);
  });
};
module.exports.missionUpdate = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  const newValues = { $set: req.body };
  missionModel.updateOne(
    { _id: req.params.id },
    newValues,
    function (err, docs) {
      if (err) return res.json({ message: "mission not found" });
      else res.status(200).json({ message: "update succes", New_values: docs });
    }
  );
  /* const result = await update.save();
      console.log(result);
      res.status(200).json(result); */
};
module.exports.missionDelete = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  missionModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error: " + err);
  });
};
//ajout d'employé sur une mission
module.exports.addEmployee = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  try {
    missionModel.findById(req.params.id, (err, docs) => {
      if (!err) {
        const userList = docs.employeesOnIt;
        const userIsHere = userList.find(
          (emp) => emp.employeeId === req.body.id
        );
        if (userIsHere) return res.send("Utilisateur déjà présent");
        try {
          missionModel.findByIdAndUpdate(
            req.params.id,
            {
              $push: {
                employeesOnIt: {
                  employeeId: req.body.id,
                  employeeBeginAt: req.body.beginAt,
                  employeeEndAt: req.body.endAt,
                  timestamp: new Date().getTime(),
                },
              },
            },
            { new: true },
            (err, docs) => {
              if (err) return res.status(400).send(err);
            }
          );
          UserModel.findByIdAndUpdate(
            req.body.id,
            {
              $push: {
                mission: {
                  mission: req.params.id,
                  beginAt: req.params.beginAt,
                  endAt: req.body.endAt,
                },
              },
            },
            { new: true },
            (err, docs) => {
              if (!err) return res.status(200).send(docs);
              else return res.status(400).send(err);
            }
          );
        } catch (error) {
          return res.status(400).send(err);
        }
      }
    });
  } catch (error) {
    return res.status(400).send(error);
  }
};
//modif employé sur une mission
module.exports.editEmployeeMission = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //params == parametre passé dans l'url
    return res.status(400).send("Unknow ID: " + req.params.id);
  try {
    return missionModel.findById(req.params.id, (err, docs) => {
      const theEmployee = docs.employeesOnIt.find((emp) => {
        if (emp.employeeId == req.body.employeeId) return emp.employeeId;
      });
      if (!theEmployee) return res.status(404).send("Employee not found");
      if (req.body.beginAt) theEmployee.employeeBeginAt = req.body.beginAt;
      if (req.body.endAt) theEmployee.employeeEndAt = req.body.endAt;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(404).send(err);
  }
};

//suppression employé d'une mission
module.exports.deleteEmployeeMission = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  try {
    missionModel.findById(req.params.id, (err, docs) => {
      if (!err) {
        const userList = docs.employeesOnIt;
        const theEmployee = userList.find(
          (emp) => emp.employeeId === req.body.employeeId
        );
        if (!theEmployee) return res.status(400).send("User non trouvé");
        else {
          const theEmployeeId = theEmployee.employeeId;
          missionModel.findByIdAndUpdate(
            req.params.id,

            {
              $pull: {
                employeesOnIt: {
                  employeeId: theEmployeeId,
                },
              },
            },
            { new: true },
            (err, docs) => {
              if (err) res.status(400).send(err);
            }
          );
          UserModel.findById(req.body.employeeId, (err, docs) => {
            if (!err) {
              const missionList = docs.mission;
              const theMission = missionList.find(
                (miss) => miss.mission === req.params.id
              );
              if (!theMission) res.send("User is not on this mission");
              else {
                const theMissionId = theMission.mission;
                UserModel.findByIdAndUpdate(
                  req.body.employeeId,
                  {
                    $pull: {
                      mission: {
                        mission: theMissionId,
                      },
                    },
                  },
                  { new: true },
                  (err, docs) => {
                    if (!err) res.send(docs);
                  }
                );
              }
            }
          });
        }
      }
    });
    /* try {
      missionModel.findByIdAndUpdate(
        req.params.id,
        {
          $pull: employeeToDelete,
        },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          res.send(err);
        }
      );
    } catch (error) {} */
  } catch (error) {
    res.status(400).send(error);
  }

  /* try {
    missionModel.findById(req.params.id, (err, docs) => {
      if (!err) {
        const userList = docs.employeesOnIt;
        const userIsHere = userList.find(
          (emp) => emp.employeeId === req.body.id
        );
        if (userIsHere) return res.send("Utilisateur déjà présent"); */
  /*  try {
    missionModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          employeesOnIt : req.body.employeeId
        }
      },
      { new: true },
      (err, docs) => {
        if (err) return res.status(400).send(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.employeeId,
      {
        $pull: {
          mission: {
            mission: req.params.id,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  } */
};
