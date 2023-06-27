const tableName = "user";
const allowedColumns = [
  "id",
  "name",
  "user_name",
  "email",
  "password",
  "access_token",
  "refresh_token",
];

module.exports = function userDatabase({ conn }) {
  return Object.freeze({
    createUser,
    getUsers,
    getUser,
    getUserByEmail,
    getUserByAccessToken,
    updateUser,
    updateUserCol,
    deleteUser,
  });

  async function createUser({
    name,
    userName,
    email,
    password,
    databaseName,
    accessToken,
    refreshToken,
  }) {
    const sql = `INSERT INTO ${databaseName}.${tableName} (name, user_name, email, password, access_token, refresh_token) VALUES ($1, $2, $3, $4,$5,$6) returning id`;
    const result = await conn.query(sql, [
      name,
      userName,
      email,
      password,
      accessToken,
      refreshToken,
    ]);
    return { insertId: result.rows[0].id };
  }

  async function getUsers({ column, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName}`;
    const { rows } = await conn.query(sql);
    return rows;
  }

  async function getUser({ column, id, databaseName }) {
    if (!allowedColumns.includes(column)) {
      throw new Error(`Column ${column} not allowed`);
    }

    const sql = `SELECT ${column} FROM ${databaseName}.${tableName} WHERE id = $1`;
    const { rows } = await conn.query(sql, [id]);
    return rows;
  }

  async function getUserByEmail({ email, databaseName }) {
    const sql = `SELECT id FROM ${databaseName}.${tableName} WHERE email = $1`;
    const { rows } = await conn.query(sql, [email]);
    return rows;
  }

  async function getUserByAccessToken({ accessToken, databaseName }) {
    const sql = `SELECT id FROM ${databaseName}.${tableName} WHERE access_token = $1`;
    const { rows } = await conn.query(sql, [accessToken]);
    return rows;
  }

  async function updateUser({ columns, id, databaseName }) {
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


  async function updateUserCol({ accessToken, id, databaseName }) {
    const sql = `UPDATE ${databaseName}.${tableName} SET access_token = $1 WHERE id = $2`;
    const { rowCount } = await conn.query(sql, [accessToken, id]);
    return rowCount;
  }

  async function deleteUser({ id, databaseName }) {
    const sql = `DELETE FROM ${databaseName}.${tableName} WHERE id = $1`;
    const { rowCount } = await conn.query(sql, [id]);
    return rowCount;
  }
};
