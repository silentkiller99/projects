module.exports = function deleteUserUseCase({
  Joi,
  ValidationError,
  userDb,
  NoDataFound,
}) {
  return async function deleteUser({ id, databaseName }) {
    validateInput({ id, databaseName });
    const result = await userDb.deleteUser({ id, databaseName });
    if (+result.affectedRows === 0) {
      throw new NoDataFound("User not found!");
    }
    return "User Deleted Successfully";
  };
  function validateInput({ id, databaseName }) {
    const deleteUserSchema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error, value } = deleteUserSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
