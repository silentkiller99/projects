const mysql = require("mysql2");
// const config = require("./config");

const pool = mysql.createPool({
  host: "localhost",
  user: "siddhant.mazumdar",
  password: "Rapid@123",
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
});
const conn = pool.promise();

const userDatabase = require("./user.db");
const userDb = userDatabase({ conn });

const folderDatabase = require("./folder.db");
const folderDb = folderDatabase({ conn });

module.exports = Object.freeze({ userDb, folderDb });
