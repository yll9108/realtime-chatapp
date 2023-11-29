const express = require("express");
const {
    getSetting,
    changeSetting,
} = require("../controllers/settingsController");
const { changePassword } = require("../controllers/userController");
const router = express.Router();

router.get("/:userId", getSetting);
router.post("/:userId", changeSetting);
router.post("/:userId/changepassword", changePassword);

module.exports = router;
