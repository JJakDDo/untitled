const express = require("express");
const router = express.Router();

const {
  getAllMonsters,
  getMonstersByField,
} = require("../controllers/monster");

router.get("/", getAllMonsters);
router.get("/:field", getMonstersByField);

module.exports = router;
