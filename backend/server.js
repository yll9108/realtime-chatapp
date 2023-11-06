const express = require("express");
const cors = require("cors");
const { dbConnect } = require("./database.js");
const userRoute = require("./routes/userRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const User = require('./models/userModel'); // Make sure to import your User model

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// User routes
app.use("/api/users", userRoute);

// Chat routes
app.use("/api/chats", chatRoute);

// Message routes
app.use("/api/messages", messageRoute);


app.post('/api/users/google-login', userController.googleLogin);
  

// Listen for requests
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Connect to DB
dbConnect();

// DB read
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to real-time chat app" });
});
