const express = require("express");
const Recipe = require("./models/recipe");
require("./config/connect");

const app = express();

// middleware
app.use(express.json());

app.get("/all", async (req, res) => {
  try {
    recipes = await Recipe.find();
    res.send(recipes);
  } catch (err) {
    res.send(err);
  }
});

app.post("/add", async (req, res) => {
  await Recipe.create(req.body)
    .then((savedRecipe) => {
      res.send(savedRecipe);
    })
    .catch((err) => {
      res.send(err);
    });
  //   newRecipe.save();
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newRecipe = req.body;
    // Make sure to include the updated data in findByIdAndUpdate
    const updateRecipe = await Recipe.findByIdAndUpdate(id, newRecipe, {
      new: true,
    });
    res.send(updateRecipe);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    deleteRecipe = await Recipe.findByIdAndDelete(id);
    res.send(deleteRecipe);
  } catch (err) {
    res.send(err);
  }
});

const port = 3008;
app.listen(port, console.log("Server already listening on port"));
