const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("users", {
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