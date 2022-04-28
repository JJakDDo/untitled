const Monster = require("../models/monster");
const Item = require("../models/item");
const { StatusCodes } = require("http-status-codes");

const getAllMonsters = async (req, res) => {
  const monster = await Monster.find({});
  res.status(StatusCodes.OK).json({ monster });
};

const getMonstersByField = async (req, res) => {
  const monster = await Monster.find({ ...req.params }).sort({
    level: 1,
  });
  for (let i = 0; i < monster.length; i++) {
    const dropItems = await Promise.all(
      monster[i].drops.map(async (drop) => {
        const item = await Item.findById(drop);
        return { ...item };
      })
    );
    monster[i].drops = dropItems;
  }
  res.status(StatusCodes.OK).json({ monster });
};

module.exports = {
  getAllMonsters,
  getMonstersByField,
};
