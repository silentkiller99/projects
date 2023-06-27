function createFolderController({
  Joi,
  ValidationError,
  createFolder,
  getUserFolderByName,
}) {
  return async function createFolderAction(req, res) {
    const { userId, name, providerId } = req.body;
    const databaseName = req.headers.databasename;
    try {
      // function call to validate input
      validateInput({ userId, name, providerId, databaseName });
      const rows = await getUserFolderByName({ name, userId, databaseName });
      // actual function call to fetch the response
      if (rows.length !== 0) {
        return res.status(404).json({ error: "Folder already exists...." });
      }
      const message = await createFolder({
        userId,
        name,
        providerId,
        databaseName,
      });
      res.status(201).json({ id: message.insertId, result: message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  };

  function validateInput({ userId, name, providerId, databaseName }) {
    const createFolderSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      userId: Joi.number().min(1).required(),
      providerId: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = createFolderSchema.validate({
      userId,
      name,
      providerId,
      databaseName,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = createFolderController;
