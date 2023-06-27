function getUserFolderController({ Joi, ValidationError, getUserFolder }) {
  return async function getUserFolderAction(req, res) {
    const { id } = req.params;
    const databaseName = req.headers.databasename;
    try {
      validateInput({ id, databaseName });
      const result = await getUserFolder({ id, databaseName });
      res.status(201).json(result);
    } catch (error) {
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
  function validateInput({ id, databaseName }) {
    const getUserFolderSchema = Joi.object({
      id: Joi.number().min(1).required(),
      userId: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getUserFolderSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = getUserFolderController;
