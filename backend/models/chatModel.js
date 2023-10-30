const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  // roomID: {
  //   type: String,
  //   unique: true,
  // },
  roomName: {
    type: String,
  },
  roomMembers: Array,
  roomPinnedBy: Array,
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
