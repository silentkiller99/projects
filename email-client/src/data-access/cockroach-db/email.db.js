const tableName = "email";
// const allowedColumns = ["id", "name", "userId", "providerId"];

module.exports = function emailDatabase({ conn }) {
  return Object.freeze({
    createEmail,
    getEmailByMessageId,
  });

  async function createEmail({
    databaseName,
    subject,
    bodyType,
    bodyText,
    bodyHtml,
    snippet,
    inReplyTo,
    scheduleAt,
    threadId,
    messageId,
    userId,
    isRead,
    createdAt,
    isArch,
    isTrashed,
  }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (
  subject,
  body_type,
  body_text,
  body_html,
  snippet,
  in_reply_to,
  scheduled_at,
  thread_id,
  message_id,
  user_id,
  is_read,
  created_at,
  is_arch,
  is_trashed
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14
) returning id`;
    const { rows } = await conn.query(sql, [
      subject,
      bodyType,
      bodyText,
      bodyHtml,
      snippet,
      inReplyTo,
      scheduleAt,
      threadId,
      messageId,
      userId,
      isRead,
      createdAt,
      isArch,
      isTrashed,
    ]);
    return rows;
  }
  async function getEmailByMessageId({ messageId, databaseName }) {
    const sql = `SELECT id FROM ${databaseName}.${tableName} WHERE message_id = $1`;
    const { rows } = await conn.query(sql, [messageId]);
    return rows;
  }

};
