const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  userName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
  //   accessToken: Joi.string().length(64).required(),
  //   refreshToken: Joi.string().length(64).required(),
});

exports.createUserValidation = (req, res, next) => {
  const valid = createUserSchema.validate(req.body);
  if (!valid.error) next();
  else res.status(400).send(`Invalid Input ${valid.error.details[0].message}`);
};

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  userName: Joi.string().min(2).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{5,30}$")).required(),
});

exports.updateUserValidation = (req, res, next) => {
  const valid = updateUserSchema.validate(req.body);
  if (!valid.error) next();
  else res.status(400).send(`Invalid Input ${valid.error.details[0].message}`);
};

const createFolderSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  userId: Joi.number().required(),
  providerId: Joi.number().required(),
});

exports.createFolderValidation = (req, res, next) => {
  const valid = createFolderSchema.validate(req.body);
  if (!valid.error) next();
  else res.status(400).send(`Invalid Input ${valid.error.details[0].message}`);
};

const updateFolderSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  userId: Joi.number().required(),
});

exports.updateFolderValidation = (req, res, next) => {
  const valid = updateFolderSchema.validate(req.body);
  if (!valid.error) next();
  else res.status(400).send(`Invalid Input ${valid.error.details[0].message}`);
};
