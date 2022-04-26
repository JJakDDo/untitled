const Monster = require("../models/monster");
const { StatusCodes } = require("http-status-codes");

const getAllMonsters = async (req, res) => {
  const monster = await Monster.find({});
  res.status(StatusCodes.OK).json({ monster });
};

module.exports = {
  getAllMonsters,
};
