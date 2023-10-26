const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./database.js");
const router = require("./routes/userRoute.js");
// const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", router);

const port = process.env.PORT || 5000;

//user
// import userModel from "./models/userModel.js";
// const userRoute = require("./routes/userRoute.js");
// app.use("/api/users", userRoute);

//chat
// import chatModel from "./models/chatModel.js";
// const chatRoute = require("./routes/chatRoute.js");
// app.use("/api/chasts", chatRoute);

//listen for requests
app.listen(8080, () => {
    console.log("server running on http://localhost:8080/");
});
//connect to DB
dbConnect();
//DB read
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to real-time chat app" });
});
