const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { battle } = require("../controllers/battle");

router.post("/:id", authentication, battle);

module.exports = router;
