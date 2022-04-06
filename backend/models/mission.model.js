const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
      trim: true,
    },
    missionName: {
      type: String,
      required: true,
      trim: true,
    },
    missionBeginDate: {
      type: Date,
      required: true,
    },
    missionEndDate: {
      type: Date,
      required: true,
    },
    missionLocation: {
      type: String,
      required: true,
    },
    employeesOnIt: {
      type: [
        {
          employeeId: String,
          employeeName: String,
          employeeSurname: String,
          employeeBeginAt: Date,
          employeeEndAt: Date,
          timestamp: Number,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mission", MissionSchema);
