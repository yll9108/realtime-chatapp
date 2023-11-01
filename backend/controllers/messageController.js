const messageModel = require("../models/messageModel.js");

//createMessage
const createMessage = async (req, res) => {
  const { chatId, senderId, content } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    content,
  });

  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log("createMessage error :", error);
    res.status(500).json(error);
  }
};
//getMessage
const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log("getMessage error :", error);
    res.status(500).json(error);
  }
};
module.exports = { createMessage, getMessage };