const joi = require("joi");

const checkupdatedrecipe = (req, res, next) => {
  const recipeSchema = joi.object({
    title: joi.string().min(3).max(20),
    description: joi.string().min(3).max(200),
    image: joi.string().required(),
    rating: joi.number().min(1).max(5),
    category: joi.string().min(3).max(20),
    ingredients: joi.array().items(joi.string()).min(1),
    instructions: joi.array().items(joi.string()).min(1),
  });

  const { error } = recipeSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

module.exports = checkupdatedrecipe;
