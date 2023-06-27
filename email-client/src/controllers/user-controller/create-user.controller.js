function createUserController({
  Joi,
  ValidationError,
  createUser,
  getUserByEmail,
  producer,
  // createDefaultFolders,
}) {
  return async function createUserAction(req, res) {
    const { name, userName, email, password } = req.body;
    const databaseName = req.headers.databasename;
    console.log(databaseName);
    try {
      validateInput({ name, userName, email, password, databaseName });
      const rows = await getUserByEmail({ email, databaseName });
      if (rows.length !== 0) {
        return res.status(404).json({ error: "User Already Exists...." });
      }
      const userId = await createUser({
        name,
        userName,
        email,
        password,
        databaseName,
      });
      const messages = [
        { key: databaseName?.toString(), value: userId?.toString() },
      ];

      sendMessage(messages);
      res.status(201).json({ userId: userId, databaseName: databaseName });
    } catch (error) {
      console.error(error);
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };

  function validateInput({ name, userName, email, password, databaseName }) {
    const createUserSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      userName: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = createUserSchema.validate({
      name,
      userName,
      email,
      password,
      databaseName,
    });
    if (error) {
      throw new ValidationError(error);
    }
  }

  async function sendMessage(messages) {
    await producer.connect();
    await producer.send({
      topic: "CreateDefaultFolder",
      messages: messages,
    });
    await producer.disconnect();
  }
}

module.exports = createUserController;
