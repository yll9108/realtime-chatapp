const express = require("express");
const {
  registerUser,
  login,
  handleResetEmail,
  handleResetToken,
  handleResetPW,
  findUser,
  getUsers,
  googleLogin,
  updateUserProfile,
  deleteUser
} = require("../controllers/userController.js");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/') // Make sure this uploads directory exists
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/reset", handleResetEmail);
router.get("/reset/:resetToken", handleResetToken);
router.post("/reset/:resetToken", handleResetPW);
router.get("/find/:userId", findUser); // /api/users/find
router.get("/", getUsers); // /api/users/
router.post("/google-login", googleLogin);
router.put('/updateProfile', upload.single('profilePicture'), updateUserProfile);
router.delete('/delete/:userId', deleteUser);


module.exports = router;
