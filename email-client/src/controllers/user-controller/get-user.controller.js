function getUserController({ Joi, ValidationError, getUser }) {
  return async function getUserAction(req, res) {
    const { id } = req.params;
    const databaseName = req.headers.databasename;
    try {
      validateInput({ id, databaseName });
      const rows = await getUser({ id, databaseName });
      res.status(201).json(rows);
    } catch (error) {
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
  function validateInput({ id, databaseName }) {
    const getUserSchema = Joi.object({
      id: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getUserSchema.validate({ id, databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = getUserController;
