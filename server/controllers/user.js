const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const signup = async (req, res) => {
  const userExist = await User.exists({ userId: req.body.userId });
  if (userExist) {
    throw CustomError.BadRequest("ID existed!");
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { userId: user.userId }, token });
};

module.exports = {
  signup,
};
