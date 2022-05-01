const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  level: {
    type: Number,
    default: 0,
  },
  type: String,
  name: String,
  description: String,
  attack: Number,
  defense: Number,
  speed: Number,
  evasion: Number,
  criticalRate: Number,
  criticalDamage: Number,
  hp: Number,
  price: Number,
  dropRate: Number,
  required: Array,
});

module.exports = mongoose.model("Items", ItemSchema);
