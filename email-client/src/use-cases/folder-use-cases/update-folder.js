module.exports = function makeUpdateFolder({ Joi, ValidationError, folderDb }) {
  return async function updateFolder({ columns, id, databaseName }) {
    validateInput({ columns, id, databaseName });
    const result = await folderDb.updateFolder({ columns, id, databaseName });
    return result.affectedRows;
  };

  function validateInput({ columns, id, databaseName }) {
    const updateFolderSchema = Joi.object({
      columns: Joi.object().required(),
      id: Joi.string()
        .guid({ version: ["uuidv4", "uuidv5"] })
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });

    const { error } = updateFolderSchema.validate({
      columns,
      id,
      databaseName,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
