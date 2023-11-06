const chatModel = require("../models/chatModel.js");

//createChat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      roomMembers: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);

    const newChat = new chatModel({
      roomMembers: [firstId, secondId],
    });

    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log("createChat error :", error);
    res.status(500).json(error);
  }
};

//finduserChats
const findUserChats = async (req, res) => {
  const userId = req.params.userId;
  // console.log(userId);
  try {
    const chat = await chatModel.find({
      roomMembers: { $in: [userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log("findUserChats error :", error);
    res.status(500).json(error);
  }
};

//findChat
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chats = await chatModel.find({
      roomMembers: { $all: [firstId, secondId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    console.log("findUserChats error :", error);
    res.status(500).json(error);
  }
};

module.exports = { createChat, findUserChats, findChat };
