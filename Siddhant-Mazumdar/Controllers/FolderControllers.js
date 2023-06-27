const { pool } = require("../Config/Connection");

async function insertFolders(name, userId, providerId) {
  const folderDetails = [name, userId, providerId];
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      `INSERT INTO EmailFolder (name,userId,providerId) VALUES ( ?,?,?)`,
      folderDetails
    );
    await conn.commit();
  } catch (err) {
    console.error(err);
    await conn.rollback();
  } finally {
    conn.release();
  }
}
module.exports.insertFolders = insertFolders;

exports.createFolder = async (req, res) => {
  const { userId, name, providerId } = req.body;
  const conn = await pool.promise().getConnection();
  const [rows] = await conn.query(
    `SELECT * FROM EmailFolder WHERE userId = ? AND name = ?`,
    [userId, name]
  );
  if (rows.length !== 0) {
    return res.status(404).json({ error: "Folder already exists...." });
  }
  await insertFolders(name, userId, providerId);
  res.status(201).send("done");
};

exports.readFolders = async (req, res) => {
  const { id } = req.params;
  const conn = await pool.promise().getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM EmailFolder WHERE userId = ?`,
      [+id]
    );
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Folder not found" });
    }

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateFolderDetails = async (req, res) => {
  const { id } = req.params;
  const { userId, name } = req.body;
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    const [rows] = await conn.query(
      `SELECT * FROM EmailFolder WHERE userId = ? AND name = ?`,
      [userId, name]
    );
    if (rows.length !== 0) {
      return res.status(404).json({ error: "Folder already exists...." });
    }
    const [result] = await conn.execute(
      "UPDATE EmailFolder SET name = ? WHERE id = ?",
      [name, +id]
    );
    await conn.commit();
    conn.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "folder not found" });
    }

    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteFolder = async (req, res) => {
  const { id } = req.params;
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute("DELETE FROM EmailFolder WHERE id = ?", [+id]);
    await conn.commit();
    conn.release();
    res.status(204).send("Folder Deleted");
  } catch (error) {
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: "Failed to delete folder" });
  }
};
