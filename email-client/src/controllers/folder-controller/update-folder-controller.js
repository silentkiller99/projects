function updateFolderController({
  Joi,
  ValidationError,
  updateFolder,
  getUserFolder,
}) {
  return async function updateFolderAction(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const databaseName = req.headers.databasename;
    try {
      validateInput({ name, id, databaseName });
      const rows = await getUserFolder({ id, databaseName });
      if (rows.length === 0) {
        return res.status(404).json({ error: "Folder not found...." });
      }
      const result = await updateFolder({ name, id, databaseName });

      res.status(200).json({ message: "updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  function validateInput({ name, id, databaseName }) {
    const updateFolderSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      id: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = updateFolderSchema.validate({ name, id, databaseNames });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = updateFolderController;
