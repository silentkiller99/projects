module.exports = function makeGetAccessToken({
  Joi,
  ValidationError,
  authServices,
}) {
  return async function getAccessToken({ refreshToken }) {
    validateInput({ refreshToken });
    const result = await authServices.getAccessToken({ refreshToken });
    return result;
  };
  function validateInput({ refreshToken }) {
    const fetchUserFolderSchema = Joi.object({
      refreshToken: Joi.string().required(),
    });
    const { error } = fetchUserFolderSchema.validate({
      refreshToken,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
