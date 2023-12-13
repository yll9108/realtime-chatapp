const { Server } = require("socket.io");

const io = new Server({
    cors: "http://localhost:8080",
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    //listen to a connection
    socket.on("addNewUser", (userId) => {
        userId !== null &&
            !onlineUsers.some((user) => user.userId === userId) &&
            onlineUsers.push({ userId, socketId: socket.id });

        console.log("socket onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    //add message
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(
            (user) => user.userId === message.recipientId
        );

        if (user) {
            io.to(user.socketId).emit("getMessage", message);
            if (message.type === "image") {
                io.to(user.socketId).emit("getImage", message);
            }
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
            });
        } else {
            console.log("can't find user");
        }
    });
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });
});

io.listen(4000);
