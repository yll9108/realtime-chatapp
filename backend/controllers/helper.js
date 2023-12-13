const userModel = require("../models/userModel.js");
const crypto = require("crypto");
const secret = process.env.SECRET;

const createUser = (values) =>
  new userModel(values).save().then((user) => user.toObject());
const getUserByField = (field, value) => userModel.findOne({ [field]: value });
const getUserBySessionToken = (sessionToken) => {
  userModel.findOne({ "authentication.sessionToken": sessionToken });
};
const getUserByResetToken = (resetToken, currentTime) =>
  userModel.findOne({
    "resetPassword.resetToken": resetToken,
    "resetPassword.resetExpiration": { $gte: currentTime },
  });

const random = () => crypto.randomBytes(128).toString("base64");

const authentication = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};

const generateHashedPassword = (password) => {
  const salt = random();
  const newHashedPassword = authentication(salt, password);
  return { salt, newHashedPassword };
};

const checkPasswordComplexity = (str, minlength, maxlength, strength) => {
  if (!str || str.length < minlength || str.length > maxlength) {
    return false;
  }
  let n = 0;
  const regex = [
    /[a-z]/,
    /[A-Z]/,
    /[0-9]/,
    /[`~!@#$%^&*()_+=,<>\-\[\]\{\}\:;\.'"\/\\?\|]/,
  ];
  for (const r of regex) {
    if (str.match(r)) {
      n++;
    }
  }
  return n >= strength;
};

console.log("Secret:", secret);

module.exports = {
  createUser,
  getUserByField,
  random,
  authentication,
  getUserBySessionToken,
  getUserByResetToken,
  checkPasswordComplexity,
  generateHashedPassword,
};
