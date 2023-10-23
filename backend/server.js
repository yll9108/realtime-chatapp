const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute.js");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

//middleware
// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

//listen for requests
app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
//cconnect to DB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection succeed"))
  .catch((error) => console.log("MongoDB connection failed:", error.message));
//DB CRUD
//crate
// app.post();
//read
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to real-time chat app" });
});
//upodate
// app.put();
//delete
// app.delete();
