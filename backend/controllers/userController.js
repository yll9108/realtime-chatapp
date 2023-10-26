// const express = require("express");
const { createUser, getUserByEmail } = require("./helper");

const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            console.log("sth wrong");
            return res.sendStatus(400);
        }
        // const existingUser = await getUserByEmail({ email });
        // if (existingUser) {
        //     return res.sendStatus(400);
        // }
        const user = await createUser({
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

module.exports = { registerUser };
