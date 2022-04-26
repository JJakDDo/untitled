const Character = require("../models/character");
const { StatusCodes } = require("http-status-codes");

const createCharacter = async (req, res) => {
  const character = await Character.create({ userId: req.user.userId });
  res.status(StatusCodes.CREATED).json({ character });
};

module.exports = {
  createCharacter,
};
