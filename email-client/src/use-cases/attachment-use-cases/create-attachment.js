module.exports = function makeCreateAttachment({
  Joi,
  ValidationError,
  attachmentDb,
}) {
  return async function createAttachment({
    databaseName,
    emailId,
    fileName,
    fileType,
    fileSize,
    filePath,
    attachmentType,
  }) {
    validateInput({
      databaseName,
      emailId,
      fileName,
      fileType,
      fileSize,
      filePath,
      attachmentType,
    });
    const result = attachmentDb.createEmailAttachment({
      databaseName,
      emailId,
      fileName,
      fileType,
      fileSize,
      filePath,
      attachmentType,
    });

    return;
  };

  function validateInput({
    databaseName,
    emailId,
    fileName,
    fileType,
    fileSize,
    filePath,
  }) {
    const schema = Joi.object({
      databaseName: Joi.string().required(),
      emailId: Joi.string().guid().required(),
      fileName: Joi.string().required(),
      fileType: Joi.string().required(),
      fileSize: Joi.number().integer().positive().required(),
      filePath: Joi.string().required(),
    });

    const { error } = schema.validate({
      databaseName,
      emailId,
      fileName,
      fileType,
      fileSize,
      filePath,
    });

    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
