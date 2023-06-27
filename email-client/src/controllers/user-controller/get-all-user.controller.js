function getAllUserController({ Joi, ValidationError, getAllUser }) {
  return async function getAllUserAction(req, res) {
    const databaseName = req.headers.databasename;
    try {
      validateInput({ databaseName });
      const rows = await getAllUser({ databaseName });
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found...." });
      }
      res.status(201).json(rows);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
  function validateInput({ databaseName }) {
    const getAllUsersSchema = Joi.object({
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getAllUsersSchema.validate({ databaseName });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = getAllUserController;
