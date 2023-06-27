const { insertFolders } = require("./FolderControllers");
const { pool } = require("../Config/Connection");

exports.checkConnection = (req, res) => {
  res.send("Connected");
};

exports.createUser = async (req, res) => {
  const { name, userName, email, password } = req.body;
  const userdetail = [name, userName, email, password];
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    //,accessToken,refreshToken
    const [result] = await conn.execute(
      `INSERT INTO User (name,userName,email,password) VALUES (?,?,?,?)`,
      userdetail
    );
    for (let i = 0; i < 5; i++) {
      const defaultfolders = ["Inbox", "Sent", "Archived", "Outbox", "Trash"];
      insertFolders(defaultfolders[i], +result.insertId, i);
    }
    await conn.commit();
    conn.release();
    res.status(201).json({ id: result.insertId, result: result });
  } catch (err) {
    console.error(err);
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: err });
  }
};

exports.readUsers = async (req, res) => {
  const conn = await pool.promise().getConnection();
  try {
    const [rows] = await conn.execute(`SELECT * FROM User `);
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// , accessToken, refreshToken
// , accessToken, refreshToken
exports.updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { name, password, userName } = req.body;
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      "UPDATE User SET name=?, password=?, userName=? WHERE id = ?",
      [name, password, userName, +id]
    );
    await conn.commit();
    conn.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.execute("DELETE FROM User WHERE id = ?", [+id]);
    await conn.commit();
    console.log(result);
    conn.release();
    res.status(204).send("User Deleted");
  } catch (error) {
    await conn.rollback();
    conn.release();
    res.status(500).json({ error });
  }
};
