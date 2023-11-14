const express = require("express");
const {
    getSetting,
    changeSetting,
} = require("../controllers/settingsController");
const router = express.Router();

router.get("/:userId", getSetting);
router.post("/:userId", changeSetting);

module.exports = router;
