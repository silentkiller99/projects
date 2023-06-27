const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "password",
  database: "database_name",
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )
`;

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database: " + error.stack);
    return;
  }
  console.log("Connected to database as id " + connection.threadId);

  createUser("John", "john@example.com", (result) => {
    readUser(result.insertId, (result) => {
      updateUser(result.id, "Johnny", (result) => {
        deleteUser(result.id, (result) => {
          connection.end();
        });
      });
    });
  });
});

connection.query(createTableQuery, (err, results, fields) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Table created successfully");
  }
});

function createUser(name, email, callback) {
  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  const values = [name, email];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Created user with ID " + results.insertId);
    callback(results);
  });
}

function readUser(id, callback) {
  const sql = "SELECT * FROM users WHERE id = ?";
  const values = [id];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(
      "User with ID " +
        results[0].id +
        ": " +
        results[0].name +
        ", " +
        results[0].email
    );
    callback(results[0]);
  });
}

function updateUser(id, name, callback) {
  const sql = "UPDATE users SET name = ? WHERE id = ?";
  const values = [name, id];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Updated " + results.affectedRows + " rows");
    callback(results);
  });
}

function deleteUser(id, callback) {
  const sql = "DELETE FROM users WHERE id = ?";
  const values = [id];
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Deleted " + results.affectedRows + " rows");
    callback(results);
  });
}

//using asyn/await

const mysql = require("mysql2/promise");

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "username",
      password: "password",
      database: "database_name",
    });
    console.log("Connected to database as id " + connection.threadId);
    return connection;
  } catch (error) {
    console.error("Error connecting to database: " + error.stack);
    return null;
  }
}

async function createUser(name, email) {
  try {
    const connection = await connect();
    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const values = [name, email];
    const [result] = await connection.query(sql, values);
    console.log("Created user with ID " + result.insertId);
    await connection.end();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function readUser(id) {
  try {
    const connection = await connect();
    const sql = "SELECT * FROM users WHERE id = ?";
    const values = [id];
    const [result] = await connection.query(sql, values);
    console.log(
      "User with ID " +
        result[0].id +
        ": " +
        result[0].name +
        ", " +
        result[0].email
    );
    await connection.end();
    return result[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateUser(id, name) {
  try {
    const connection = await connect();
    const sql = "UPDATE users SET name = ? WHERE id = ?";
    const values = [name, id];
    const [result] = await connection.query(sql, values);
    console.log("Updated " + result.affectedRows + " rows");
    await connection.end();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function deleteUser(id) {
  try {
    const connection = await connect();
    const sql = "DELETE FROM users WHERE id = ?";
    const values = [id];
    const [result] = await connection.query(sql, values);
    console.log("Deleted " + result.affectedRows + " rows");
    await connection.end();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

(async () => {
  const user1 = await createUser("John", "john@example.com");
  const user2 = await readUser(user1.insertId);
  const user3 = await updateUser(user2.id, "Johnny");
  const user4 = await deleteUser(user3.id);
})();



//wetjklkjhfds
const Sequelize = require("sequelize");

const sequelize = new Sequelize("form", "siddhant.mazumdar", "Rapid@123", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;

//ettt
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("myTable", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  dateOfBirth: { type: Sequelize.DATEONLY, allowNull: false },
  fileName: { type: Sequelize.STRING, allowNull: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = User;

//erthrg

const User = require("./controllers/routeControllers");
User.sync()
  .then(() => {
    console.log("User table created successfully.");
  })
  .catch((error) => {
    console.error("Error while creating User table:", error);
  });
User.create({
  firstName: "John2",
  lastName: "Doe2",
  dateOfBirth: "1990-01-01",
  fileName: "file2.txt",
})
  .then((user) => {
    console.log("New user created:", user.toJSON());
  })
  .catch((error) => {
    console.error("Error while creating user:", error);
  });

User.update({ lastName: "Smith" }, { where: { firstName: "John" } })
  .then((numRowsAffected) => {
    console.log(`Updated ${numRowsAffected} rows.`);
  })
  .catch((error) => {
    console.error("Error while updating/user:", error);
  });
User.destroy({ where: { firstName: "John2" } })
  .then((numRowsAffected) => {
    console.log(`Deleted ${numRowsAffected} rows.`);
  })
  .catch((error) => {
    console.error("Error while deleting user:", error);
  });

const mysql = require("mysql2");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "siddhant.mazumdar",
//   password: "Rapid@123",
//   database: "formdatabase01",
// });
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL
//   )
// `;

const insertQuery = `
  INSERT INTO users (name, email)
  VALUES ('siddhant', 'sid@1999')
`;

connection.query(createTableQuery, (err, results, fields) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Table created successfully");
  }
});

connection.query(insertQuery, (error, results, fields) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Data inserted successfully");
  }
});

connection.end();
