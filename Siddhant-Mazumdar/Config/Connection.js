const mysql = require("mysql2");

exports.pool = mysql.createPool({
  host: "localhost",
  user: "siddhant.mazumdar",
  password: "Rapid@123",
  database: "EmailClint",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
