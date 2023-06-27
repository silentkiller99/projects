"use strict";

const { Sequelize } = require("sequelize");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("EmailAttachment", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      emailId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Email",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fileName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      fileType: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      filePath: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("EmailAttachment", ["fileName"], {
      indexName: "fileNameIndex",
      using: "BTREE",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex("EmailAttachment", "fileNameIndex");
    await queryInterface.dropTable("EmailAttachment");
  },
};
