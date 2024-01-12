const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/recipes")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
  });
module.exports = mongoose;
