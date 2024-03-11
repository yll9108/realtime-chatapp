const express = require("express");
const cors = require("cors");

const { dbConnect } = require("./database.js");
const userRoute = require("./routes/userRoute.js");
const chatRoute = require("./routes/chatRoute.js");
const messageRoute = require("./routes/messageRoute.js");
const settingsRoute = require("./routes/settingsRoute.js");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// User routes
app.use("/api/users", userRoute);

// Chat routes
app.use("/api/chats", chatRoute);

// Message routes
app.use("/api/messages", messageRoute);

// Settings routes
app.use("/api/settings", settingsRoute);

// Listen for requests
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use("/uploads", express.static("uploads"));

// Connect to DB
dbConnect();

// DB read
app.get("/", (req, res) => {
    res.json({ msg: "Welcome to real-time chat app" });
});
let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (userId) => {
        if (!onlineUsers.some((user) => user.userId === userId)) {
            onlineUsers.push({ userId, socketId: socket.id });
        }
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
        const recipient = onlineUsers.find(
            (user) => user.userId === message.recipientId
        );
        if (recipient) {
            io.to(recipient.socketId).emit("getMessage", message);
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUsers", onlineUsers);
        console.log("user disconnected");
    });
});
