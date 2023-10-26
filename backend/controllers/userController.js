const userModel = require("../models/userModel.js");
const { createUser, getUserByEmail } = require("./helper");
const { v4: uuid } = require("uuid");

const registerUser = async (req, res) => {
    try {
        let userID = uuid();
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            console.log("sth wrong");
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail({ email });
        if (existingUser) {
            console.log("user exists");
            return res.sendStatus(400);
        }
        const user = await createUser({
            userID,
            userName,
            email,
            password,
        });
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }

        const user = await userModel.findOne({ email: email });
        if (!user) {
            console.log("user doesn't exist");
            return res.sendStatus(400);
        }
        if (password !== user.password) {
            console.log("Password wrong");
            return res.sendStatus(403);
        } else {
            console.log("Login succeed");
            return res.status(200).json(user).end();
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

module.exports = { registerUser, login };
