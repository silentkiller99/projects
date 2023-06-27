const tableName = "email_folder";
const allowedColumns = ["id", "name", "userId", "providerId"];

module.exports = function folderDatabase({ conn }) {
  return Object.freeze({
    createFolder,
    getUserFolder,
    getUserFolders,
    getUserFolderByName,
    updateFolder,
    deleteFolder,
  });

  async function createFolder({ userId, name, providerId, databaseName }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (name, user_id, provider_id) VALUES (?, ?, ?)`;
    const [result] = await conn.execute(sql, [name, userId, providerId]);
    return result;
  }

  async function getUserFolder({ column, id, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName} WHERE id = ?`;
    const [rows] = await conn.query(sql, [id]);
    return rows;
  }

  async function getUserFolders({ column, userId, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName} WHERE user_id = ?`;
    const [rows] = await conn.query(sql, [userId]);
    return rows;
  }

  async function getUserFolderByName({ name, userId, databaseName }) {
    const sql = `SELECT name FROM ${databaseName}.${tableName} WHERE user_id = ? AND name = ?`;
    const [rows] = await conn.query(sql, [userId, name]);
    return rows;
  }

  async function updateFolder({ name, id, databaseName }) {
    const sql = `UPDATE ${databaseName}.${tableName} SET name = ? WHERE id = ?`;
    const [result] = await conn.execute(sql, [name, id]);
    return result;
  }

  async function deleteFolder({ id, databaseName }) {
    const sql = `DELETE FROM ${databaseName}.${tableName} WHERE id = ?`;
    const [result] = await conn.execute(sql, [id]);
    return result;
  }
};
