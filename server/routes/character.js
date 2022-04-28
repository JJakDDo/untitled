const express = require("express");
const router = express.Router();

const {
  createCharacter,
  equipItems,
  getInventory,
  getCharacter,
} = require("../controllers/character");

router.post("/", createCharacter);
router.get("/", getCharacter);
router.get("/inventory", getInventory);
router.post("/equip", equipItems);

module.exports = router;
