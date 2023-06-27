module.exports = function makeGetFolderByProviderId({
  Joi,
  ValidationError,
  folderDb,
}) {
  return async function getUserFolderByProviderId({
    providerId,
    userId,
    databaseName,
  }) {
    // validateInput({ providerId, userId, databaseName });
    const rows = await folderDb.getUserFolderByProviderId({
      providerId,
      userId,
      databaseName,
    });
    return rows;
  };
  function validateInput({ name, userId, databaseName }) {
    const getFolderSchema = Joi.object({
      name: Joi.string().min(1).max(30).required(),
      userId: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getFolderSchema.validate({ name, userId, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
