const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { craftItems, getCraftRecipes } = require("../controllers/craft");

router.get("/", getCraftRecipes);
router.post("/:id", authentication, craftItems);

module.exports = router;
