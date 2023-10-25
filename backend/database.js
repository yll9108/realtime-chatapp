const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.ATLAS_URI;

exports.dbConnect = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connection succeed"))
    .catch((error) => console.log("MongoDB connection failed:", error.message));
};
