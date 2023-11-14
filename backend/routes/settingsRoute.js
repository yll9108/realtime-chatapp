const express = require("express");
const { getSetting } = require("../controllers/settingsController");
const router = express.Router();

router.get("/:userId", getSetting);

module.exports = router;
