module.exports = function getAllUserUseCase({
  Joi,
  ValidationError,
  userDb,
  NoDataFound,
}) {
  return async function getAllUser({ column, databaseName }) {
    validateInput({ column, databaseName });
    const rows = await userDb.getUsers({ column, databaseName });
    if (rows.length === 0) throw new NoDataFound("User not found!");
    return rows;
  };
  function validateInput({ databaseName }) {
    const getAllUsersSchema = Joi.object({
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getAllUsersSchema.validate({ databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
