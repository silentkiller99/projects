"use strict";

const { Sequelize, DataTypes } = require("sequelize-cockroachdb");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE IF NOT EXISTS "enum_email_recipient_type" AS ENUM ('FROM', 'TO', 'CC', 'BCC');
    `);

    const enum_email_recipient_type = DataTypes.ENUM("FROM", "TO", "CC", "BCC");
    await queryInterface.createTable("email_recipient", {
      id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: enum_email_recipient_type,
        allowNull: false,
      },
      email_id: {
        type: Sequelize.UUID,
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
