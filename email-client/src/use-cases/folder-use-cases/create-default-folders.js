module.exports = function makecreateDefaultFolders({
  Joi,
  ValidationError,
  lodash,
  createFolder,
}) {
  return async function createDefaultFolders({ userId }) {
    validateInput({ userId });
    const defaultFolders = ["Inbox", "Sent", "Archived", "Outbox", "Trash"];
    // for (let index = 0; index < defaultFolders.length; index++) {
    //   const element = defaultFolders[index];

    //   const result = await createFolder({
    //     name: element,
    //     userId,
    //     providerId: index + 1,
    //   });
    //   return "done";
    // }
    const res = await Promise.all(
      lodash.map(defaultFolders, async (value, index) => {
        const result = await createFolder({
          name: value,
          userId,
          providerId: index + 1,
        });
        return result;
      })
    );
    return "done";
  };

  function validateInput({ userId }) {
    const getFoldersSchema = Joi.object({
      userId: Joi.number().min(1).required(),
      databaseName: Joi.string().min(2).max(20).required(),
    });
    const { error } = getFoldersSchema.validate({ userId });
    if (error) {
      throw new ValidationError(error.message);
    }
  }
};
