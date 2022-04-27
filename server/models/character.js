const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  level: {
    type: Number,
    default: 1,
  },
  str: {
    type: Number,
    default: 0,
  },
  dex: {
    type: Number,
    default: 0,
  },
  int: {
    type: Number,
    default: 0,
  },
  attack: {
    type: Number,
    default: 10,
  },
  defense: {
    type: Number,
    default: 10,
  },
  speed: {
    type: Number,
    default: 1,
  },
  evasion: {
    type: Number,
    default: 0,
  },
  criticalRate: {
    type: Number,
    default: 0,
  },
  criticalDamage: {
    type: Number,
    default: 21,
  },
  hp: {
    type: Number,
    default: 100,
  },
  exp: {
    type: Number,
    default: 0,
  },
  requiredExp: {
    type: Number,
    default: 100,
  },
  userId: {
    type: String,
  },
  equipment: {
    type: Object,
    default: {},
  },
  inventory: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Characters", CharacterSchema);
