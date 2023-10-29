const express = require("express");
const {
    registerUser,
    login,
    resetPW,
    handleResetToken,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset", resetPW);
router.get("/reset/:resetToken", handleResetToken);

module.exports = router;
