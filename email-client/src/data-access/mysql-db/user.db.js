const tableName = "user";
const allowedColumns = ["id", "name", "userName", "email", "password"];

module.exports = function userDatabase({ conn }) {
  return Object.freeze({
    createUser,
    getUsers,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser,
  });
  async function createUser({ name, userName, email, password, databaseName }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (name, user_name, email, password) VALUES (?, ?, ?, ?)`;
    const [result] = await conn.execute(sql, [name, userName, email, password]);
    return result;
  }

  async function getUsers({ column, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName}`;
    const [rows] = await conn.query(sql);
    return rows;
  }

  async function getUser({ column, id, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName} WHERE id = ?`;
    const [rows] = await conn.query(sql, [id]);
    return rows;
  }

  async function getUserByEmail({ email, databaseName }) {
    const sql = `SELECT email FROM ${databaseName}.${tableName} WHERE email = ?`;
    const [rows] = await conn.query(sql, [email]);
    return rows;
  }

  async function updateUser({ name, password, userName, id, databaseName }) {
    const sql = `UPDATE ${databaseName}.${tableName} SET name = ?, password = ?, user_name = ? WHERE id = ?`;
    const [result] = await conn.execute(sql, [name, password, userName, id]);
    return result;
  }

  async function deleteUser({ id, databaseName }) {
    const sql = `DELETE FROM ${databaseName}.${tableName} WHERE id = ?`;
    const [result] = await conn.execute(sql, [id]);
    return result;
  }
};
