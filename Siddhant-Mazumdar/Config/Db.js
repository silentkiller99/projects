const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const sequelize = new Sequelize(
  "EmailClint",
  "siddhant.mazumdar",
  "Rapid@123",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

const umzug = new Umzug({
  migrations: { glob: "Migrations/*.js" },
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
//{ force: true }
