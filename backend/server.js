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

app.post('/api/users/google-login', async (req, res) => {
    const { uid, email, displayName } = req.body;
    
    try {
      // Check if the user already exists in the database
      let user = await User.findOne({ firebaseUid: uid });
  
      if (user) {
        // User exists, update the user data if necessary
        // ...
        return res.status(200).send(user);
      } else {
        // User doesn't exist, create a new user
        const newUser = new User({
          email: email,
          userName: displayName,
          // Set other fields as necessary
          firebaseUid: uid,
          authentication: { password: 'N/A' } // Or handle it as per your schema
        });
  
        // Save the new user to the database
        user = await newUser.save();
        return res.status(201).send(user);
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
      return res.status(500).send(error);
    }
  });
  

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
