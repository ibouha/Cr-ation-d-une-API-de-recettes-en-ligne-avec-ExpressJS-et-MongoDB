const Joi = require("joi");

const checkUser = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().trim().min(10).max(100).required().email(),
    username: Joi.string().trim().min(2).max(255).required(),
    password: Joi.string().trim().min(8).required(),
    isAdmin: Joi.bool(),
  });

  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

module.exports = checkUser;
