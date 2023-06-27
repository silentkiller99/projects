"use strict";

const { Sequelize } = require("sequelize");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("email_attachment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "email",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      file_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      file_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      file_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      file_path: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("email_attachment", ["file_name"], {
      indexName: "file_name_index",
      using: "BTREE",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex("email_attachment", "file_name_index");
    await queryInterface.dropTable("email_attachment");
  },
};
