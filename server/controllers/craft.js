const Item = require("../models/item");
const { StatusCodes } = require("http-status-codes");

const craftItems = async (req, res) => {
  // let newStatObj = {};
  // STATS.forEach((stat) => {
  //   if (item[stat]) {
  //     const newStat = Math.floor(Math.random() * item[stat] + item[stat] * 0.5);
  //     let tier = "";
  //     if (newStat >= item[stat] * 1.45) {
  //       tier = "S";
  //     } else if (newStat >= item[stat] * 1.3) {
  //       tier = "A";
  //     } else if (newStat >= item[stat] * 1.1) {
  //       tier = "B";
  //     } else if (newStat >= item[stat] * 0.9) {
  //       tier = "C";
  //     } else if (newStat >= item[stat] * 0.7) {
  //       tier = "D";
  //     } else {
  //       tier = "E";
  //     }
  //     newStatObj[stat] = { value: newStat, tier };
  //   }
  // });
  // dropped.push({
  //   _id: item._id,
  //   level: item.level,
  //   name: item.name,
  //   description: item.description,
  //   price: item.price,
  //   type: item.type,
  //   ...newStatObj,
  // });
  // inventory.push({
  //   _id: item._id,
  //   level: item.level,
  //   name: item.name,
  //   description: item.description,
  //   price: item.price,
  //   type: item.type,
  //   ...newStatObj,
  // });
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
