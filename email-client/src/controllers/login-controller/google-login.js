function googleLoginController({
  authUseCases,
  userUseCases,
  kafkaProducer,
  config,
}) {
  return async function googleLoginAction(req, res) {
    try {
      const code = req.query.code;
      const data = await authUseCases.getAuthToken({ code });
      const accessToken = data.access_token;
      const idToken = data.id_token;
      const refreshToken = data.refresh_token;

      // get user with tokens
      const googleUser = await authUseCases.getGoogleUser({
        idToken,
        accessToken,
      });
      if (!googleUser.verified_email) {
        res.status(403).send("Google account is not verified");
      }
      const userId = await userUseCases.createUser({
        databaseName: config.cockroach.dbName,
        id: googleUser.id,
        email: googleUser.email?.toString(),
        name: googleUser.name?.toString(),
        userName: googleUser.given_name?.toString(),
        password: "defaultPassword",
        refreshToken: refreshToken?.toString(),
        accessToken: accessToken?.toString(),
      });
      await kafkaProducer({
        topic: config.kafkaTopics.userCreated,
        messages: [{ key: userId, value: accessToken?.toString() }],
      });

      res
        .status(201)
        .json({ userId: userId, databaseName: config.cockroach.dbName });
    } catch (error) {
      console.error(error);
      res.status(error.httpStatusCode).json({ error: error.message });
    }
  };
}

module.exports = googleLoginController;
