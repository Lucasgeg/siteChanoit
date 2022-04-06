const UserModel = require("../models/user.model");
const { signUpErrors } = require("../utils/errors.utils");

module.exports.signUp = async (req, res) => {
  try {
    const user = await UserModel.create({ ...req.body });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};
