module.exports = function makeGetFolder({ Joi, ValidationError, folderDb,NoDataFound }) {
  return async function getFolder({ id, databaseName, coloumn }) {
    validateInput({ id, databaseName });
    const rows = await folderDb.getUserFolder({
      coloumn,
      id,
      databaseName,
    });
    if (rows.length === 0) throw new NoDataFound("Folder not found!");
    return rows;
  };
  function validateInput({ id, databaseName }) {
    const getFolderSchema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getFolderSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
