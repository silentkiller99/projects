module.exports = function updateUserUseCase({ Joi, ValidationError, userDb }) {
  return async function updateUser({ columns, id, databaseName }) {
    validateInput({ columns, id, databaseName });
    const result = await userDb.updateUser({
      columns,
      id,
      databaseName,
    });
    return result;
  };

  function validateInput({ columns, id, databaseName }) {
    const updateUserSchema = Joi.object({
      columns: Joi.object().required(),
      id: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = updateUserSchema.validate({
      columns,
      id,
      databaseName,
    });
    if (error) throw new ValidationError(error.message);
  }
};
