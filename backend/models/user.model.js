const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    picture: {
      type: String,
      default: "./uploads/profil/defaultm.png",
    },
    nom: {
      type: String,
      required: true,
      max: 60,
      minlength: 2,
    },
    prenom: {
      type: String,
      required: true,
      max: 60,
      minlength: 2,
    },
    birthday: {
      type: Date,
      required: true,
    },
    birthCity: {
      type: String,
      required: true,
    },
    secu: {
      type: String,
      required: true,
      minlength: 15,
      maxlength: 15,
      unique: true,
    },
    role: {
      type: Number,
      max: 3,
      default: 3,
    },
    statut: {
      type: Number,
      max: 3,
      default: 3,
    },
    mission: {
      type: [
        {
          mission: String,
          beginAt: Date,
          endAt: Date,
          timestamp: Number,
        },
      ],
    },
    contract: {
      type: [String],
    },
    workedTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

//usermodel= mongoose.model("table de la base de donnée", toutes les donnée du modele créer)
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
