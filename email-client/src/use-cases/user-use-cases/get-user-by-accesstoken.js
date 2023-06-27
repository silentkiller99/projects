module.exports = function getUserByEmailUseCase({
  Joi,
  ValidationError,
  userDb,
}) {
  return async function getUserByEmail({ email, databaseName }) {
    validateInput({ email, databaseName });
    const rows = await userDb.getUserByEmail({ email, databaseName });
    return rows;
  };

  function validateInput({ email, databaseName }) {
    const getUserByEmailSchema = Joi.object({
      email: Joi.string().email().required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getUserByEmailSchema.validate({ email, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
