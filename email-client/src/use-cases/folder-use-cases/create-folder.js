module.exports = function makeCreateFolder({
  Joi,
  ValidationError,
  folderDb,
  kafkaProducer,
  config,
}) {
  const PRIORITY = {
    INBOX: 1,
    SENT: 2,
    IMPORTANT: 3,
    STARRED: 4,
    // Add other system labels with priority values here
  };

  return async function createFolder({
    userId,
    name,
    providerId,
    databaseName,
    type,
  }) {
    validateInput({ userId, name, providerId, databaseName, type });

    let priority = 5; // Default priority value for user-created labels

    // Assign priority values based on the type of the folder
    switch (type) {
      case "system":
        priority = PRIORITY[name] || 0;
        break;
      // Add cases for other types of labels if needed
    }

    // Create the folder with the assigned priority value
    const rows = await folderDb.createFolder({
      userId,
      name,
      providerId,
      databaseName,
      type,
      priority,
    });
    await kafkaProducer({
      topic: config.kafkaTopics.folderCreated,
      messages: [
        {
          value: userId?.toString(),
        },
      ],
    });
    return rows;
  };

  function validateInput({ userId, name, providerId, databaseName, type }) {
    const createFolderSchema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      userId: Joi.string()
        .guid({
          version: ["uuidv4", "uuidv5"],
        })
        .required(),
      providerId: Joi.string().required(),
      databaseName: Joi.string().min(2).max(20).required(),
      type: Joi.string().required(),
    }).required();
    const { error } = createFolderSchema.validate({
      userId,
      name,
      providerId,
      databaseName,
      type,
    });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
