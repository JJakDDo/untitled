const Item = require("../models/item");
const Character = require("../models/character");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const STATS = [
  "attack",
  "defense",
  "speed",
  "evasion",
  "criticalRate",
  "criticalDamage",
  "hp",
];
const craftItems = async (req, res) => {
  const item = await Item.findById(req.params.id);
  const { userId, nickname } = req.user;
  let { inventory } = await Character.findOne({ userId });
  const requiredItemIndex = [];
  if (item) {
    const { required } = item;
    for (let i = 0; i < required.length; i++) {
      const itemIndex = inventory.findIndex(
        (obj) => obj._id === required[i].id
      );
      if (itemIndex >= 0) {
        if (inventory[itemIndex].amount < required[i].amount) {
          throw CustomError.BadRequest("You do not have enough items");
        }
        requiredItemIndex.push(itemIndex);
      } else {
        throw CustomError.BadRequest("You do not have items for crafting!");
      }
    }
    let crafted = [];
    for (let i = 0; i < requiredItemIndex.length; i++) {
      inventory[requiredItemIndex[i]].amount -= required[i].amount;
    }

    let newStatObj = {};
    STATS.forEach((stat) => {
      if (item[stat]) {
        const newStat = Math.floor(
          Math.random() * item[stat] + item[stat] * 0.5
        );
        let tier = "";
        if (newStat >= item[stat] * 1.45) {
          tier = "S";
        } else if (newStat >= item[stat] * 1.3) {
          tier = "A";
        } else if (newStat >= item[stat] * 1.1) {
          tier = "B";
        } else if (newStat >= item[stat] * 0.9) {
          tier = "C";
        } else if (newStat >= item[stat] * 0.7) {
          tier = "D";
        } else {
          tier = "E";
        }
        newStatObj[stat] = { value: newStat, tier };
      }
    });
    crafted.push({
      _id: item._id,
      level: item.level,
      name: item.name,
      description: item.description,
      price: item.price,
      type: item.type,
      ...newStatObj,
    });
    inventory.push({
      _id: item._id.toString(),
      level: item.level,
      name: item.name,
      description: item.description,
      price: item.price,
      type: item.type,
      ...newStatObj,
    });

    await Character.findOneAndUpdate({ userId }, { inventory });
    return res.status(StatusCodes.CREATED).json(crafted);
  }
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
