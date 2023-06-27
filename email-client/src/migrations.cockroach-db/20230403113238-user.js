"use strict";
const { Sequelize, DataTypes } = require("sequelize-cockroachdb");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("user", {
      id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      access_token: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.STRING(1234),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP()"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP()",
          "ON UPDATE",
          "CURRENT_TIMESTAMP()"
        ),
      },
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("user");
  },
};
