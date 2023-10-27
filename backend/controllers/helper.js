const userModel = require("../models/userModel.js");
const crypto = require("crypto");
const secret = process.env.SECRET;

const createUser = (values) =>
    new userModel(values).save().then((user) => user.toObject());

const getUserByEmail = (email) => userModel.findOne(email);

const random = () => crypto.randomBytes(128).toString("base64");

const authentication = (salt, password) => {
    return crypto
        .createHmac("sha256", [salt, password].join("/"))
        .update(secret)
        .digest("hex");
};

console.log("Secret:", secret);

module.exports = { createUser, getUserByEmail, random, authentication };
