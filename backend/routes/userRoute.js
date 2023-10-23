const express = require("express");
const {
  reigsterUser,
  registerUser,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
