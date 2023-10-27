const userModel = require("../models/userModel.js");
const {
    createUser,
    getUserByEmail,
    random,
    authentication,
} = require("./helper");
const { v4: uuid } = require("uuid");

const registerUser = async (req, res) => {
    try {
        let userID = uuid();
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            console.log("missing one of them: userName, email or password");
            return res.sendStatus(400);
        }
        const existingUser = await getUserByEmail({ email });
        if (existingUser) {
            console.log("user already exists");
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            userID,
            userName,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });
        console.log("Generated salt:", salt);
        console.log("Stored salt:", user.authentication.salt);
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
            console.log("sth missing: email or password");
            return res.sendStatus(400);
        }

        const user = await getUserByEmail({ email }).select(
            "+authentication.salt+authentication.password"
        );
        if (!user) {
            console.log("user doesn't exist");
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);
        console.log("expectedHash", expectedHash);
        console.log("storedpassword", user.authentication.password);
        if (user.authentication.password !== expectedHash) {
            console.log("Password wrong");
            return res.sendStatus(403);
        }
        console.log("Login succeed");
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

module.exports = { registerUser, login };
