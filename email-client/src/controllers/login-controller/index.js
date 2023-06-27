const config = require("../../config");

const {
  authUseCases,
  userUseCases,
  kafkaProducer,
} = require("../../use-cases");
const googleLoginController = require("./google-login");
const googleLogin = googleLoginController({
  authUseCases,
  userUseCases,
  kafkaProducer,
  config,
});
module.exports = Object.freeze({ googleLogin });
