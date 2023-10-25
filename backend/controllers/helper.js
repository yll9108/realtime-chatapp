const { userModel } = require("../models/userModels");

const createUser = (values) =>
    new userModel(values).save().then((user) => user.toObject());

const getUserByEmail = () => userModel.findOne({ email });

module.exports = { createUser, getUserByEmail };
