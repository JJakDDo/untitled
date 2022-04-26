const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const user = require("../models/user");

const signup = async (req, res) => {
  const userExist = await User.exists({ userId: req.body.userId });
  if (userExist) {
    return res.status(400).json({ message: "Existing ID" });
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
