const express = require("express");
const {
    registerUser,
    login,
    resetPW,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset", resetPW);

module.exports = router;
