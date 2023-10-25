const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileURL: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    Enum: ["active", "away"],
    default: "away",
  },
  showProfile: {
    type: Boolean,
    default: false,
  },
  showStatus: {
    type: Boolean,
    default: false,
  },
  showAbout: {
    type: Boolean,
    default: false,
  },
  friends: [{ type: String }],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;
