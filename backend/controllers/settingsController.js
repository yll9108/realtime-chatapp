const userModel = require("./../models/userModel");
const { responseMap } = require("./responseMap");
const { getUserByField } = require("./helper");
const { default: mongoose } = require("mongoose");

// a function to check if it's valuedUserId
const isValuedUserId = (userId) => mongoose.Types.ObjectId.isValid(userId);

// when user logged in, frontend will get backend setting and show in the frontend.
const getSetting = async (req, res) => {
    const userId = req.params.userId;
    // console.log("userId", userId);
    try {
        if (!isValuedUserId(userId)) {
            console.log("user not found");
            return res.send(responseMap.nonExistingUser);
        } else if (isValuedUserId(userId)) {
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
const changeSetting = async (req, res) => {
    try {
        const { showProfile, showStatus, showAbout } = req.body;
        const userId = req.params.userId;

        // 验证 userId 是否是有效的 ObjectId
        if (!isValuedUserId(userId)) {
            console.log("User not found");
            return res.send(responseMap.nonExistingUser);
        } else if (isValuedUserId(userId)) {
            const updatdSetting = await userModel.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        showProfile,
                        showStatus,
                        showAbout,
                    },
                },
                { new: true }
            );
            console.log("User settings updated", updatdSetting);
            return res.sendStatus(200);
        }
    } catch (error) {
        console.log("error", error);
        return res.send(responseMap.serverError);
    }
};
module.exports = { getSetting, changeSetting };
