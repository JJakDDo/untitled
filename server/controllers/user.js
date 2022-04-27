const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const signup = async (req, res) => {
  const userExist = await User.exists({ userId: req.body.userId });
  if (userExist) {
    throw CustomError.BadRequest("ID existed!");
  }

  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user: { userId: user.userId } });
};

const login = async (req, res) => {
  const { userId, password } = req.body;
  if (!userId || !password) {
    throw CustomError.BadRequest("User ID or Passowrd is not provided!");
  }
  const user = await User.findOne({ userId, password });
  if (!user) {
    throw CustomError.BadRequest("User ID and Password is wrong!");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token });
};

module.exports = {
  signup,
  login,
};
