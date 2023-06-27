const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");

const migrationPath = path.join(__dirname + "/migrations.mysql/*.js");
const sequelize = new Sequelize(
  "email_clint_1",
  "siddhant.mazumdar",
  "Rapid@123",
  {
    dialect: "mysql",
    host: "localhost",
  }
);
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
    await umzug
      .up()
      .then(() => {
        console.log("All migrations performed successfully");
      })
      .catch((err) => {
        console.log("Migration failed:", err.stack);
      });
    await sequelize.sync().then(() => {
      console.log("All tables were synchronized successfully.");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
//{ force: true }