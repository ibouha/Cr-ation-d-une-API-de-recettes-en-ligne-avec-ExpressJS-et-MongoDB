const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const checkrecipe = require("../middlewares/recipeMiddleware");
const checkupdatedrecipe = require("../middlewares/recipeUpdatedMidd");
const authenticateToken = require("../middlewares/user/tokenMiddleware");

/**
 * @swagger
 * tags:
 *   name: recipes
 *   description: crud recipes
 */

/**
 * @swagger
 * /api/recipes/all:
 *   get:
 *     summary: Get all recipes
 *     tags: [recipes]
 *     description: Get all recipes
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "60f3b8f58570635cd768ea80"
 *                 title: "Spaghetti Bolognese"
 *                 category: "Pasta"
 *                 ingredients: ["spaghetti", "minced meat", "tomato sauce"]
 *                 instructions: "Cook the spaghetti, brown the meat, add tomato sauce..."
 *                 createdAt: "2021-07-18T10:30:00Z"
 *                 updatedAt: "2021-07-18T12:15:00Z"
 */
router.get("/all", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (err) {
    res.send(err);
  }
});

/**
 * @swagger
 * /api/recipes/{category}:
 *   get:
 *     summary: Get recipes by category
 *     tags: [recipes]
 *     description: Get recipes by category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category of recipes to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - _id: "60f3b8f58570635cd768ea80"
 *                 title: "Spaghetti Bolognese"
 *                 category: "Pasta"
 *                 ingredients: ["spaghetti", "minced meat", "tomato sauce"]
 *                 instructions: "Cook the spaghetti, brown the meat, add tomato sauce..."
 *                 createdAt: "2021-07-18T10:30:00Z"
 *                 updatedAt: "2021-07-18T12:15:00Z"
 */
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const recipes = await Recipe.find({ category });
    res.status(200).send(recipes);
  } catch (err) {
    res.send(err);
  }
});

/**
 * @swagger
 * /api/recipes/create:
 *   post:
 *     summary: Create a new recipe
 *     tags: [recipes]
 *     description: Create a new recipe
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Recipe data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "New Recipe"
 *             category: "Other"
 *             ingredients: ["ingredient1", "ingredient2"]
 *             instructions: "Step 1, Step 2..."
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               _id: "60f3b8f58570635cd768ea81"
 *               title: "New Recipe"
 *               category: "Other"
 *               ingredients: ["ingredient1", "ingredient2"]
 *               instructions: "Step 1, Step 2..."
 *               createdAt: "2021-07-19T09:45:00Z"
 *               updatedAt: "2021-07-19T09:45:00Z"
 */
router.post("/create", authenticateToken, checkrecipe, async (req, res) => {
  try {
    const recipe = await Recipe(req.body);
    res.status(200).send(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/recipes/update/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [recipes]
 *     description: Update a recipe
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated recipe data
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Updated Recipe"
 *             category: "Other"
 *             ingredients: ["newIngredient1", "newIngredient2"]
 *             instructions: "Updated Step 1, Updated Step 2..."
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               _id: "60f3b8f58570635cd768ea81"
 *               title: "Updated Recipe"
 *               category: "Other"
 *               ingredients: ["newIngredient1", "newIngredient2"]
 *               instructions: "Updated Step 1, Updated Step 2..."
 *               createdAt: "2021-07-19T09:45:00Z"
 *               updatedAt: "2021-07-19T10:00:00Z"
 */
router.put(
  "/update/:id",
  checkupdatedrecipe,
  authenticateToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const newRecipe = req.body;
      const updateRecipe = await Recipe.findByIdAndUpdate(id, newRecipe, {
        new: true,
      });
      res.status(200).send(updateRecipe);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

/**
 * @swagger
 * /api/recipes/delete/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [recipes]
 *     description: Delete a recipe
 *
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the recipe to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               _id: "60f3b8f58570635cd768ea81"
 *               title: "Deleted Recipe"
 *               category: "Other"
 *               ingredients: ["deletedIngredient1", "deletedIngredient2"]
 *               instructions: "Deleted Step 1, Deleted Step 2..."
 *               createdAt: "2021-07-19T09:45:00Z"
 *               updatedAt: "2021-07-19T10:00:00Z"
 */
router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRecipe = await Recipe.findByIdAndDelete(id);
    res.status(200).send(deleteRecipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
