module.exports = function updateUserColUseCase({
  Joi,
  ValidationError,
  userDb,
}) {
  return async function updateUserCol({ accessToken, databaseName, id }) {
    validateInput({ accessToken, databaseName, id });
    const result = await userDb.updateUserCol({
      accessToken,
      databaseName,
      id,
    });
    return result.affectedRows;
  };

  function validateInput({ accessToken, databaseName, id }) {
    const updateUserSchema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      accessToken: Joi.string().required(),
      databaseName: Joi.string().required(),
    });
    const { error } = updateUserSchema.validate({
      accessToken,
      databaseName,
      id,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
