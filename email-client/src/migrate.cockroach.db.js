const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");
const fs = require("fs");
const certsPath = path.join(__dirname + "../../../../certs");
const migrationPath = path.join(__dirname + "/migrations.cockroach-db/*.js");

const dialectOptions = {
  multipleStatements: true,

  decimalNumbers: true,
};

if (true) {
  dialectOptions.ssl = {
    ca: fs.readFileSync(certsPath + "/ca.crt").toString(),

    key: fs.readFileSync(certsPath + "/client.root.key").toString(),

    cert: fs.readFileSync(certsPath + "/client.root.crt").toString(),
  };
}

const sequelize = new Sequelize({
  database: "email_clint_1",

  host: "localhost",

  dialect: "postgres",

  username: "root",

  password: null,

  port: 26257 || null,

  dialectOptions: dialectOptions,
});

const umzug = new Umzug({
  migrations: { glob: migrationPath },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
    await sequelize.sync().then(() => {
      console.log("All tables were synchronized successfully.");
    });
    await umzug
      .up()
      .then(() => {
        console.log("All migrations performed successfully");
      })
      .catch((err) => {
        console.log("Migration failed:", err.stack);
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
