"use strict";

const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("EmailRecipient", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(["FROM", "TO", "CC", "BCC"]),
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("EmailRecipient", ["email"], {
      indexName: "emailIndex",
      using: "BTREE",
    });
    await queryInterface.addIndex("EmailRecipient", ["type"], {
      indexName: "typeIndex",
      using: "BTREE",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex("EmailRecipient", "emailIndex");
    await queryInterface.removeIndex("EmailRecipient", "typeIndex");
    await queryInterface.dropTable("EmailRecipient");
  },
};
