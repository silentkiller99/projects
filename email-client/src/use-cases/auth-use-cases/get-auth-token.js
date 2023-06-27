module.exports = function makeGetAuthToken({
  Joi,
  ValidationError,
  authServices,
}) {
  return async function getAuthToken({ code }) {
    validateInput({ code });
    const result = await authServices.authToken({ code });
    return result;
  };
  function validateInput({ code }) {
    const fetchUserFolderSchema = Joi.object({
      code: Joi.string().required(),
    });
    const { error } = fetchUserFolderSchema.validate({
      code,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
