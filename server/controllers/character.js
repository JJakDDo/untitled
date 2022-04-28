const Character = require("../models/character");
const Item = require("../models/item");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const STATS = {
  ATT: "attack",
  DEF: "defense",
  SPD: "speed",
  EVS: "evasion",
  CR: "criticalRate",
  CD: "criticalDamage",
  HP: "hp",
};

const createCharacter = async (req, res) => {
  const character = await Character.create({ userId: req.user.userId });
  res.status(StatusCodes.CREATED).json({ character });
};

const equipItems = async (req, res) => {
  const { inventoryIdx } = req.body;
  const character = await Character.findOne({ userId: req.user.userId });
  if (!character) {
    throw CustomError.BadRequest("User does not exist!");
  }

  if (inventoryIdx < 0 || inventoryIdx >= character.inventory.length) {
    throw CustomError.BadRequest("Cannot equip items player do not own!");
  }

  const equipItem = await Item.findById(character.inventory[inventoryIdx]);
  if (equipItem.type === "material") {
    throw CustomError.BadRequest("Cannot equip materials!");
  }

  let { equipment, inventory } = character;
  // 장착 하고 있던 아이템은 인벤토리에 추가
  if (equipment[equipItem.type]) {
    inventory.push(equipment[equipItem.type].toString());
    const removedItem = await Item.findById(equipment[equipItem.type]);
    let changedStat = {};
    // 스탯을 반복적으로 돌면서 만약 아이템에 해당 스탯이 존재하면 현재 캐릭터의 스탯에서 뺀다.
    for (const stat in STATS) {
      if (removedItem[STATS[stat]]) {
        character[STATS[stat]] -= removedItem[STATS[stat]];
        changedStat = { ...changedStat, [STATS[stat]]: character[STATS[stat]] };
      }
    }
  }

  equipment = { ...equipment, [equipItem.type]: equipItem._id.toString() };
  let changedStat = {};
  // 스탯을 반복적으로 돌면서 만약 아이템에 해당 스탯이 존재하면 현재 캐릭터의 스탯에 더해준다.
  for (const stat in STATS) {
    if (equipItem[STATS[stat]]) {
      character[STATS[stat]] += equipItem[STATS[stat]];
      changedStat = { ...changedStat, [STATS[stat]]: character[STATS[stat]] };
    }
  }
  // 장착 한 후에는 인벤토리에서 삭제
  inventory = inventory.filter((item, idx) => idx !== inventoryIdx);
  await Character.findOneAndUpdate(
    { userId: req.user.userId },
    { equipment, inventory, ...changedStat }
  );
  res.status(StatusCodes.OK).json({ status: "success" });
};

const getInventory = async (req, res) => {
  const character = await Character.findOne({ userId: req.user.userId });
  if (!character) {
    throw CustomError.BadRequest("User does not exist!");
  }

  const { inventory } = character;
  const data = await Promise.all(
    inventory.map(async (itemId) => {
      const item = await Item.findById(itemId);
      return item;
    })
  );
  res.status(StatusCodes.OK).json({ data });
};

const getCharacter = async (req, res) => {
  const character = await Character.findOne({ userId: req.user.userId });
  if (!character) {
    throw CustomError.BadRequest("User does not exist!");
  }

  const {
    level,
    str,
    dex,
    int,
    attack,
    defense,
    speed,
    evasion,
    criticalRate,
    criticalDamage,
    hp,
    exp,
    requiredExp,
    userId,
  } = character;

  res.status(StatusCodes.OK).json({
    level,
    str,
    dex,
    int,
    attack,
    defense,
    speed,
    evasion,
    criticalRate,
    criticalDamage,
    hp,
    exp,
    requiredExp,
    userId,
  });
};

module.exports = {
  createCharacter,
  equipItems,
  getInventory,
  getCharacter,
};
