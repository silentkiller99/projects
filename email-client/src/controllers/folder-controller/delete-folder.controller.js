function deleteFolderController({ Joi, ValidationError, deleteFolder }) {
  return async function deleteFolderAction(req, res) {
    const { id } = req.params;
    const databaseName = req.headers.databasename;
    try {
      validateInput({ id, databaseName });
      const result = await deleteFolder({ id, databaseName });
      res.status(204).send("Folder Deleted");
    } catch (error) {
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
  function validateInput({ id, databaseName }) {
    const deleteFolderSchema = Joi.object({
      id: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = deleteFolderSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = deleteFolderController;
