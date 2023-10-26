const userModel = require("../models/userModel.js");

const createUser = (values) =>
    new userModel(values).save().then((user) => user.toObject());

const getUserByEmail = (email) => userModel.findOne(email);

module.exports = { createUser, getUserByEmail };
