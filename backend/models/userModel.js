const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
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
    authentication: {
        salt: { type: String },
        password: { type: String, required: true },
        sessionToken: { type: String },
        newPassword: { type: String },
    },
    resetPassword: {
        resetToken: { type: String },
        resetExpiration: { type: Date },
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
