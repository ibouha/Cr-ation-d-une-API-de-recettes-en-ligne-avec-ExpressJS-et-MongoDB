const Joi = require("joi");

const checkLogin = (req, res, next) => {
  const loginSchema = Joi.object({
    email: Joi.string().trim().min(10).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });

  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};

module.exports = checkLogin;
