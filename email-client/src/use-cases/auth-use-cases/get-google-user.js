module.exports = function makeGetGoogleUser({
  Joi,
  ValidationError,
  authServices,
}) {
  return async function getGoogleUser({ idToken, accessToken }) {
    validateInput({ idToken, accessToken });
    const result = await authServices.googleUser({ idToken, accessToken });
    return result;
  };
  function validateInput({ accessToken, idToken }) {
    const fetchUserFolderSchema = Joi.object({
      accessToken: Joi.string().required(),
      idToken: Joi.string().required(),
    });
    const { error } = fetchUserFolderSchema.validate({
      accessToken,
      idToken,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
