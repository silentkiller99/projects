module.exports = function makeCreateUser({
  Joi,
  ValidationError,
  userDb,
  getUserByEmail,
}) {
  return async function createUser({
    name,
    userName,
    email,
    password,
    databaseName,
    accessToken,
    refreshToken,
  }) {
    validateInput({
      name,
      userName,
      email,
      password,
      databaseName,
      accessToken,
      refreshToken,
    });
    const rows = await getUserByEmail({ email, databaseName });
    if (rows.length !== 0) {
      throw new Error("User Already Exists....");
    }
    const result = await userDb.createUser({
      name,
      userName,
      email,
      password,
      databaseName,
      accessToken,
      refreshToken,
    });
    return result.insertId;
  };

  function validateInput({
    name,
    userName,
    email,
    password,
    databaseName,
    accessToken,
    refreshToken,
  }) {
    const createUserSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      userName: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{5,30}$"))
        .required(),
      databaseName: Joi.string().min(2).max(20).required(),
      accessToken: Joi.string().required(),
      refreshToken: Joi.string().required(),
    });
    const { error } = createUserSchema.validate({
      name,
      userName,
      email,
      password,
      databaseName,
      accessToken,
      refreshToken,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
