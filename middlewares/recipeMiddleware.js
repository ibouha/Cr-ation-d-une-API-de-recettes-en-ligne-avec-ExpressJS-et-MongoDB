const joi = require("joi");

const checkrecipe = (req, res, next) => {
  const recipeSchema = joi.object({
    title: joi.string().min(3).max(20).required(),
    description: joi.string().min(3).max(200).required(),
    image: joi.string().required(),
    rating: joi.number().min(1).max(5).required(),
    category: joi.string().min(3).max(20).required(),
    ingredients: joi.array().items(joi.string()).required().min(1),
    instructions: joi.array().items(joi.string()).required().min(1),
  });

  const { error } = recipeSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

module.exports = checkrecipe;
