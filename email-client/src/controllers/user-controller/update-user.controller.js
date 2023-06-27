function updateUserController({ Joi, ValidationError, updateUser, getUser }) {
  return async function updateUserAction(req, res) {
    const { id } = req.params;
    const { name, password, userName } = req.body;
    const databaseName = req.headers.databasename;
    try {
      validateInput({ name, password, userName, id, databaseName });
      const rows = await getUser({ id, databaseName });
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found...." });
      }
      const result = await updateUser({
        name,
        password,
        userName,
        id,
        databaseName,
      });
      res.status(200).json({ message: "updated successfully" });
    } catch (error) {
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
  function validateInput({ name, password, userName, id, databaseName }) {
    const updateUserSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      userName: Joi.string().min(2).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
        .required(),
      id: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = updateUserSchema.validate({
      name,
      password,
      userName,
      id,
      databaseName,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
}

module.exports = updateUserController;
