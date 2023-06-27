module.exports = function makeGetUserFolders({
  Joi,
  ValidationError,
  folderDb,
  NoDataFound,
}) {
  return async function getUserFolders({ userId, databaseName }) {
    validateInput({ userId, databaseName });
    const rows = await folderDb.getUserFolders({
      coloumn: "name",
      userId,
      databaseName,
    });
    if (rows.length === 0) throw new NoDataFound("Folder not found!");
    return rows;
  };
  function validateInput({ userId, databaseName }) {
    const getFoldersSchema = Joi.object({
      userId: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getFoldersSchema.validate({ userId, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
