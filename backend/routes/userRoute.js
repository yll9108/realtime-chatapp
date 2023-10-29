const express = require("express");
const {
    registerUser,
    login,
    resetPW,
    handleResetToken,
    handleResetPW,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset", resetPW);
router.get("/reset/:resetToken", handleResetToken);
router.post("/reset/:resetToken", handleResetPW);

module.exports = router;
