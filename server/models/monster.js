const mongoose = require("mongoose");

const MonsterSchema = new mongoose.Schema({
  level: Number,
  name: String,
  attack: Number,
  defense: Number,
  speed: Number,
  evasion: Number,
  criticalRate: Number,
  criticalDamage: Number,
  hp: Number,
  exp: Number,
  skills: Array,
  drops: Array,
  image: String,
  field: String,
});

module.exports = mongoose.model("Monsters", MonsterSchema);
