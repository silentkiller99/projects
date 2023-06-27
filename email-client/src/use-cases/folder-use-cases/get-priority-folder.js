module.exports = function makeGetPriorityFolder({
  Joi,
  ValidationError,
  folderDb,
}) {
  return async function getPriorityFolder({ userId, databaseName }) {
    validateInput({ userId, databaseName });
    const rows = await folderDb.getPriorityFolder({
      userId,
      databaseName,
    });
    return rows;
  };
  function validateInput({ userId, databaseName }) {
    const getFolderSchema = Joi.object({
      userId: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getFolderSchema.validate({ userId, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
