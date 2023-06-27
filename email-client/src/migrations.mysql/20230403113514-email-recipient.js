"use strict";

const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("email_recipient", {
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
      email_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "email",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex("email_recipient", ["email"], {
      indexName: "email_index",
      using: "BTREE",
    });
    await queryInterface.addIndex("email_recipient", ["type"], {
      indexName: "type_index",
      using: "BTREE",
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex("email_recipient", "email_index");
    await queryInterface.removeIndex("email_recipient", "type_index");
    await queryInterface.dropTable("email_recipient");
  },
};
