const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  rating: Number,
  category: String,
  ingredients: Array,
  instructions: Array,
  equipments: Array,
});

const Recipe = mongoose.model("Recipe", schema);
module.exports = Recipe;
