"use strict";

const { Sequelize, DataTypes } = require("sequelize-cockroachdb");
module.exports = {
  up: async ({ context: queryInterface }) => {
    // await queryInterface.sequelize.query(`
    //   CREATE TYPE IF NOT EXISTS "enum_email_attachment_attachment_type" AS ENUM ('attachment', 'inline');
    // `);
    // const enum_email_attachment_attachment_type = DataTypes.ENUM(
    //   "attachment",
    //   "inline"
    // );
    await queryInterface.createTable("email_attachment", {
      id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      // attachment_type: {
      //   type: enum_email_attachment_attachment_type,
      //   allowNull: false,
      // },
      email_id: {
        type: Sequelize.UUID,
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
