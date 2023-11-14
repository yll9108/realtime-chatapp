const userModel = require("./../models/userModel");
const { responseMap } = require("./responseMap");
const { getUserByField } = require("./helper");

// when user logged in, frontend will get backend setting and show in the frontend.
const getSetting = async (req, res) => {
    const userId = req.params.userId;
    console.log("userId", userId);
    try {
        const user = await getUserByField("_id", userId);
        console.log("user", user);
        res.send("good");
    } catch (error) {
        console.log("error", error);
        return res.send("bad");
    }
};

module.exports = { getSetting };
