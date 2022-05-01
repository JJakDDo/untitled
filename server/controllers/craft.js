const Item = require("../models/item");
const { StatusCodes } = require("http-status-codes");

const craftItems = async (req, res) => {
  res.send("craft items");
};

const getCraftRecipes = async (req, res) => {
  const items = await Item.find({ type: { $ne: "material" } });
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items[i].required.length; j++) {
      const item = await Item.findById(items[i].required[j].id);
      const temp = {};
      temp.id = items[i].required[j].id;
      temp.name = item.name;
      temp.description = item.description;
      temp.type = item.type;
      items[i].required[j] = { ...items[i].required[j], ...temp };
    }
  }
  res.status(StatusCodes.OK).json(items);
};

module.exports = {
  craftItems,
  getCraftRecipes,
};
