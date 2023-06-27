const Joi = require("joi");
exports.isValidInput = (req, res, next) => {
  const checkObj = ({ firstName, lastName, dateOfBirth } = req.body);
  const inputSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    lastName: Joi.string().min(3).required(),
    dateOfBirth: Joi.date(),
  });
  const valid = inputSchema.validate(checkObj);
  if (!valid.error) next();
  else res.status(400).send(`Invalid Input ${valid.error.details[0].message}`);
};
