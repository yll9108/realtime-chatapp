const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    unique: true,
  },
  roomName: {
    type: String,
  },
  roomMembers: [{ type: String }],
  roomPinnedBy: {
    type: Boolean,
    default: false,
  },
  roomCreatedAt: {
    type: Date,
    default: Date.now(),
  },
  roomUpdatedAt: {
    type: Date,
    default: null,
  },
});

const chatRoomModel = mongoose.model("chatrooms", chatroomSchema);

module.exports = chatRoomModel;
