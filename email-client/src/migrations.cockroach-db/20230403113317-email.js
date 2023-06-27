"use strict";
const { Sequelize, DataTypes } = require("sequelize-cockroachdb");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE IF NOT EXISTS "enum_email_body_type" AS ENUM ('TEXT', 'HTML')
    `);

    const enum_email_body_type = Sequelize.ENUM("TEXT", "HTML");
    await queryInterface.createTable("email", {
      id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      body_type: {
        type: enum_email_body_type,
        allowNull: false,
      },

      body_text: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      body_html: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      snippet: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      in_reply_to: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scheduled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      thread_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      message_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "user",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      is_arch: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      is_trashed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });

    await queryInterface.addIndex("email", ["subject"], {
      indexName: "subject_index",
      using: "BTREE",
    });
    await queryInterface.addIndex("email", ["thread_id"], {
      indexName: "thread_id_index",
      using: "BTREE",
    });
    await queryInterface.addIndex("email", ["is_arch"], {
      indexName: "is_arch_index",
      using: "BTREE",
    });
    await queryInterface.addIndex("email", ["is_trashed"], {
      indexName: "is_trashed_index",
      using: "BTREE",
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex("email", "subject_index");
    await queryInterface.removeIndex("email", "thread_id_index");
    await queryInterface.removeIndex("email", "is_arch_index");
    await queryInterface.removeIndex("email", "is_trashed_index");
    await queryInterface.dropTable("email");
  },
};
