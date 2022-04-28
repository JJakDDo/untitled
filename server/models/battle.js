const mongoose = require("mongoose");

const BattleSchema = new mongoose.Schema({
  id: String,
  character: {
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    evasion: Number,
    criticalRate: Number,
    criticalDamage: Number,
    currentExp: Number,
    requiredExp: Number,
    level: Number,
    inventory: Array,
    skills: Array,
  },
  monster: {
    hp: Number,
    attack: Number,
    defense: Number,
    speed: Number,
    evasion: Number,
    criticalRate: Number,
    criticalDamage: Number,
    name: String,
    exp: Number,
    drops: Array,
    skills: Array,
  },
});

module.exports = mongoose.model("Battles", BattleSchema);
