const tableName = "email_folder";
const allowedColumns = ["id", "name", "userId", "providerId"];

module.exports = function folderDatabase({ conn }) {
  return Object.freeze({
    createFolder,
    getUserFolder,
    getUserFolders,
    getPriorityFolder,
    getUserFolderByName,
    getUserFolderByProviderId,
    updateFolder,
    deleteFolder,
  });

  async function createFolder({
    userId,
    name,
    providerId,
    databaseName,
    type,
    priority,
  }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (name, user_id, provider_id, type, priority) VALUES ($1, $2, $3, $4, $5) returning id`;
    const { rows } = await conn.query(sql, [
      name,
      userId,
      providerId,
      type,
      priority,
    ]);
    return rows;
  }

  async function getPriorityFolder({ databaseName, userId }) {
    const { rows } = await conn.query(
      `SELECT * FROM ${databaseName}.${tableName} WHERE priority > 0 AND "sync_status" IN ('STANDBY','FETCHING') AND "user_id" = $1 ORDER BY priority ASC LIMIT 1`,

      [userId]
    );
    return rows;
  }

  async function getUserFolder({ column, id, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName} WHERE id = $1`;
    const { rows } = await conn.query(sql, [id]);
    return rows;
  }

  async function getUserFolders({ column, userId, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName} WHERE user_id = $1`;
    const { rows } = await conn.query(sql, [userId]);
    return rows;
  }

  async function getUserFolderByName({ name, userId, databaseName }) {
    const sql = `SELECT name FROM ${databaseName}.${tableName} WHERE user_id = $1 AND name = $2`;
    const { rows } = await conn.query(sql, [userId, name]);
    return rows;
  }

  async function getUserFolderByProviderId({
    providerId,
    userId,
    databaseName,
  }) {
    const sql = `SELECT id FROM ${databaseName}.${tableName} WHERE user_id = $1 AND provider_id = $2`;
    const { rows } = await conn.query(sql, [userId, providerId]);
    return rows;
  }

  async function updateFolder({ columns, id, databaseName }) {
    const setColumns = Object.keys(columns)
      .map((col, i) => `${col} = $${i + 1}`)
      .join(", ");
    const values = Object.values(columns);
    const sql = `UPDATE ${databaseName}.${tableName} SET ${setColumns} WHERE id = $${
      values.length + 1
    }`;
    const { rowCount } = await conn.query(sql, [...values, id]);
    return rowCount;
  }


  async function deleteFolder({ id, databaseName }) {
    const sql = `DELETE FROM ${databaseName}.${tableName} WHERE id = $1`;
    const { rowCount } = await conn.query(sql, [id]);
    return rowCount;
  }
};
