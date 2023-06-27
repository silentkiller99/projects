"use strict";

const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("EmailFolderAssociations", {
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
      folderId: {
        type: Sequelize.INTEGER,
        references: {
          model: "EmailFolder",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("EmailFolderAssociations");
  },
};
