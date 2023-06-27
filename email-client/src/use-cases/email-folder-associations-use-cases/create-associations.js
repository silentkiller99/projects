module.exports = function makeCreateEmailFolderAssociation({
  Joi,
  ValidationError,
  emailFolderAssociationsDb,
}) {
  return async function createEmailFolderAssociation({
    emailId,
    folderId,
    databaseName,
  }) {
    // validateInput({ emailId, folderId, databaseName });
    const rows = emailFolderAssociationsDb.createEmailFolderAssociations({
      emailId,
      folderId,
      databaseName,
    });

    return rows;
  };
  function validateInput({ emailId, folderId, databaseName }) {
    //Joi implementation
  }
};
