function deleteUserController({ Joi, ValidationError, deleteUser }) {
  return async function deteleUserAction(req, res) {
    const { id } = req.params;
        const databaseName = req.headers.databasename;
    try {
      validateInput({ id, databaseName });
      const message = await deleteUser({ id, databaseName });
      res.status(200).json({ message: message });
    } catch (error) {
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
  function validateInput({ id, databaseName }) {
    const deleteUserSchema = Joi.object({
      id: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = deleteUserSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = deleteUserController;
