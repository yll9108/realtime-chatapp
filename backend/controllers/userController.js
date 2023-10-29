const userModel = require("../models/userModel.js");
const {
    createUser,
    getUserByEmail,
    random,
    authentication,
} = require("./helper");
const { v4: uuid } = require("uuid");
const nodemailer = require("nodemailer");

const port = process.env.PORT || 5000;
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

// reset password
const resetPW = async (req, res) => {
    try {
        // use email as rest tool
        const { email } = req.body;
        const user = await getUserByEmail({ email });

        // when user typed in WRONG email
        if (!user) {
            console.log("Email hasn't been signed up.");
            return res.sendStatus(400);
        }

        // when user typed in CORRECT email
        const salt = random();
        const token = authentication(salt, user._id.toString());
        console.log("token", token);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        try {
            await transporter.sendMail({
                from: process.env.MY_EMAIL,
                to: user.email,
                subject: "RESET PASSWORD",
                html: `<p>Hi user: ${user.userName}</p>
            <p>Please click the link to reset the password.</p>
            <a href="http://localhost:${port}/api/users/reset/${token}" /><p>Link</p>
            <p>Link will be expired in 1 hour, thank you!</p>`,
            });
        } catch (error) {
            console.log("error");
            return res.sendStatus(500);
        }
        console.log(`MSG: Reset mail has been sent successfully!`);

        // update token
        user.resetPassword = {
            resetToken: token,
            resetExpiration: Date.now() + 36000,
        };
        console.log("token", user.resetPassword.resetToken);
        console.log("user.resetExpiration", user.resetPassword.resetExpiration);
        await user.save();
        console.log(`MSG:`);

        // after clicking the link, look for user inside token
        const resetToken = req.params.resetToken;
        const resetUser = await userModel.findOne({
            "resetPassword.resetToken": resetToken,
            "resetPassword.resetExpiration": { $gte: Date.now() },
        });
        if (!resetUser) {
            console.log("Link expired!");
            return res.status(400);
        }
        // handle if found user inside token
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

module.exports = { registerUser, login, resetPW };
