const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { createCharacter } = require("../controllers/character");

router.post("/", authentication, createCharacter);

module.exports = router;
