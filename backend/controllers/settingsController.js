const userModel = require("./../models/userModel");
const { responseMap } = require("./responseMap");
const { getUserByField } = require("./helper");
const { default: mongoose } = require("mongoose");

// when user logged in, frontend will get backend setting and show in the frontend.
const getSetting = async (req, res) => {
    const userId = req.params.userId;
    // console.log("userId", userId);
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("user not found");
            return res.send(responseMap.nonExistingUser);
        } else if (userId) {
            const user = await getUserByField("_id", userId).select(
                "+showProfile+showStatus+showAbout"
            );
            console.log("user settings", user);
            return res.sendStatus(200);
        }
    } catch (error) {
        console.log("error", error);
        return res.send(responseMap.serverError);
    }
};

// when user logged in, user can change setting.
// const changeSetting = async (req, res) => {
//     try {
//         const { showProfile, showStatus, showAbout } = req.body;
//         if
//     } catch (error) {
//         console.log("error", error);
//         return res.send(responseMap.serverError);
//     }
// };
module.exports = { getSetting };
