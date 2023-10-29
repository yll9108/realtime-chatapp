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
        const userID = uuid();
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
        const token = Math.random().toString(16).slice(3);
        console.log("token1", token);
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
            <a href="http://localhost:${port}/api/user/reset/${token}"><p>Link</p></a>
            <p>Link will be expired in 1 hour, thank you!</p>`,
            });
            console.log("token2", token);
        } catch (error) {
            console.log("error");
            return res.sendStatus(500);
        }

        // update token
        user.resetPassword = {
            resetToken: token,
            resetExpiration: Date.now() + 3600000,
        };
        console.log("token3", user.resetPassword.resetToken);
        console.log("user.resetExpiration", user.resetPassword.resetExpiration);
        await user.save();
        console.log(`MSG: token has been saved`);
        return res.status(200).json({ msg: "Password reset email sent." });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

// after clicking the link, look for user inside token
const handleResetToken = async (req, res) => {
    const resetToken = req.params.resetToken;
    console.log("req.oarams.resetToken", req.params.resetToken);
    const resetUser = await userModel.findOne({
        "resetPassword.resetToken": resetToken,
        "resetPassword.resetExpiration": { $gte: Date.now() },
    });

    if (!resetUser) {
        console.log("Link expired");
        return res.send(400).json({ msg: "Link expired" });
    }
    return res.status(200).json({ msg: "Token existed." });
};
// handle if found user inside token

// const { userID, password } = req.body;
// try {
//     const user = await userModel.findOne({ userID });
//     if (!user) {
//         console.log("user not fount");
//         return res.sendStatus(400);
//     }
// } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
// }
// user.authentication.password = password;
// user.resetToken = null;
// await user.save();

// console.log("Password reset successfully");
// return res.sendStatus(200);

module.exports = { registerUser, login, resetPW, handleResetToken };
