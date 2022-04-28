const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { battle, manualBattle } = require("../controllers/battle");

router.post("/:id", authentication, battle);
router.post("/manual/:id", authentication, manualBattle);

module.exports = router;
