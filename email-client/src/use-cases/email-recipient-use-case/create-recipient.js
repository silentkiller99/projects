module.exports = function makeCreateRecipient({
  Joi,
  ValidationError,
  recipientDb,
}) {
  return async function createRecipient({
    databaseName,
    emailId,
    email,
    type,
  }) {
    // validateInput({
    //   databaseName,
    //   emailId,
    //   email,
    //   type,
    // });
    const result = await recipientDb.createEmailRecipient({
      databaseName,
      emailId,
      email,
      type,
    });

    return;
  };

  function validateInput({ databaseName, emailId, email, type }) {
    const schema = Joi.object({
      databaseName: Joi.string().required(),
      emailId: Joi.string().guid().required(),
      email: Joi.string().required(),
      type: Joi.string().required(),
    });

    const { error } = schema.validate({
      databaseName,
      emailId,
      email,
      type,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
