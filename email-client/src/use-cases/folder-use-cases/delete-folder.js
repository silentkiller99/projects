module.exports = function makeDeleteFolder({
  Joi,
  ValidationError,
  NoDataFound,
  folderDb,
}) {
  return async function deleteFolder({ id, databaseName }) {
    validateInput({ id, databaseName });
    const result = await folderDb.deleteFolder({ id, databaseName });
    if (+result.affectedRows === 0) {
      throw new NoDataFound("Folder not found!");
    }
    return "Folder Deleted Successfully";
  };
  function validateInput({ id, databaseName }) {
    const deleteFolderSchema = Joi.object({
      id: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = deleteFolderSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
