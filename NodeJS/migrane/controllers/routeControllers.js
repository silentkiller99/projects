const path = require("path");
const fs = require("fs");
const multer = require("multer");
const mime = require("mime");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "siddhant.mazumdar",
  password: "Rapid@123",
  database: "form",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const insertQuery = `
  INSERT INTO users (firstName, lastName, dateOfBirth, fileName)
  VALUES ( ?,?,?,? )
`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public/uploads"));
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

exports.upload = multer({ storage });

exports.uploadDetails = async (req, res, next) => {
  const { firstName, lastName, dateOfBirth } = req.body;
  const file = req.file.filename;

  const values = [firstName, lastName, dateOfBirth, file];
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      insertQuery,
      values,
      (error, results, fields) => {
        if (error) console.log(error.message);
        console.log("Data inserted successfully");
      }
    );

    await conn.commit();
    conn.release();
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.readAll = async (req, res) => {
  const conn = await pool.promise().getConnection();
  try {
    const [rows, fields] = await conn.execute("SELECT * FROM users");
    console.log(`Found ${rows.length} users:`);
    console.log(rows);

    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.read = async (req, res) => {
  const { id } = req.params;
  const conn = await pool.promise().getConnection();

  try {
    const [rows] = await conn.execute(`SELECT * FROM users WHERE user_id = ?`, [
      id,
    ]);
    conn.release();

    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.downloadFile = (req, res, next) => {
  const filename = req.params.id;
  const mimetype = mime.getType(`public/uploads/${filename}`);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  const filestream = fs.createReadStream(`public/uploads/${filename}`);
  filestream.pipe(res);
};

exports.viewFile = (req, res, next) => {
  const filename = req.params.id;
  const mimetype = mime.getType(`public/uploads/${filename}`);

  res.setHeader("Content-disposition", "inline; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  const filestream = fs.createReadStream(`public/uploads/${filename}`);
  filestream.pipe(res);
};

exports.updateDetails = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, dateOfBirth } = req.body;
  const conn = await pool.promise().getConnection();
  const params = [firstName, lastName, dateOfBirth, id];
    
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      "UPDATE users SET firstName = ?, lastName = ?, dateOfBirth = ? WHERE user_id = ?",
      params
    );
    //[firstName, lastName, dateOfBirth, id]
    console.log(`User with ID ${id} updated successfully`);
    await conn.commit();
    conn.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    await conn.rollback();
    conn.release();
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const conn = await pool.promise().getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute("DELETE FROM users WHERE user_id = ?", [id]);
    await conn.commit();
    conn.release();
    res.status(204).send();
  } catch (error) {
    await conn.rollback();
    conn.release();
    res.status(500).json({ error });
  }
};
