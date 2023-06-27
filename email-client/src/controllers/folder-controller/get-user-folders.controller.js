function getUserFoldersController({ Joi, ValidationError, getUserFolders }) {
  return async function getUserFoldersAction(req, res) {
    const userId = req.params.id;
    const databaseName = req.headers.databasename;
    try {
      validateInput({ userId, databaseName });
      const result = await getUserFolders({ userId, databaseName });
      res.status(201).json(result);
    } catch (error) {
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
  function validateInput({ userId, databaseName }) {
    const getUserFoldersSchema = Joi.object({
      userId: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getUserFoldersSchema.validate({ userId, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = getUserFoldersController;
