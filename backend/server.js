const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./database.js");
const userRoute = require("./routes/userRoute.js");
const chatRoute = require("./routes/chatRoute.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
//user
app.use("/api/users", userRoute);

//chat
app.use("/api/chats", chatRoute);

//listen for requests
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
//connect to DB
dbConnect();
//DB read
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to real-time chat app" });
});
