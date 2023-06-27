const tableName = "email_attachment";
// const allowedColumns = ["id", "name", "userId", "providerId"];

module.exports = function emailAttachmentDatabase({ conn }) {
  return Object.freeze({
    createEmailAttachment,
  });

 async function createEmailAttachment({
   databaseName,
   emailId,
   fileName,
   fileType,
   fileSize,
   filePath,
 }) {
   const sql = `INSERT INTO ${databaseName}.${tableName} (email_id, file_name, file_type, file_size, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
   const result = await conn.query(sql, [
     emailId,
     fileName,
     fileType,
     fileSize,
     filePath,
   ]);

   return result.rows[0].id;
 }

};
