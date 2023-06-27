const tableName = "email_recipient";
// const allowedColumns = ["id", "name", "userId", "providerId"];

module.exports = function emailAttachmentDatabase({ conn }) {
  return Object.freeze({
    createEmailRecipient,
  });

  async function createEmailRecipient({ databaseName, emailId, email, type }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (email_id, email, type) VALUES ($1, $2,$3) RETURNING id`;
    const result = await conn.query(sql, [emailId, email, type]);

    return result.rows[0].id;
  }
};
