module.exports = function getUserUseCase({
  Joi,
  ValidationError,
  userDb,
  NoDataFound,
}) {
  return async function getUser({ column, id, databaseName }) {
    validateInput({ id, databaseName });
    const rows = await userDb.getUser({
      column,
      id,
      databaseName,
    });
    if (rows.length === 0) throw new NoDataFound("User not found!");
    return rows;
  };
  function validateInput({ id, databaseName }) {
    const getUserSchema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getUserSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
