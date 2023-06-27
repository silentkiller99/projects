const tableName = "email_folder_associations";
// const allowedColumns = ["id", "name", "userId", "providerId"];

module.exports = function emailFolderAssociationsDatabase({ conn }) {
  return Object.freeze({
    createEmailFolderAssociations,
  });

  async function createEmailFolderAssociations({
    databaseName,
    emailId,
    folderId,
  }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (email_id,folder_id) VALUES ($1,$2) returning id`;
    const result = await conn.query(sql, [emailId, folderId]);

    return result;
  }
};
