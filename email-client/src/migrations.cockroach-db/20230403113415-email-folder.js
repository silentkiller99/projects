"use strict";
const { Sequelize, DataTypes } = require("sequelize-cockroachdb");

module.exports = {
  up: async ({ context: queryInterface }) => {
    // Create the "enum_email_folder_sync_status" ENUM type
    await queryInterface.sequelize.query(`
      CREATE TYPE IF NOT EXISTS "enum_email_folder_sync_status" AS ENUM ('FETCHING','FETCHED','STANDBY')
    `);

    // Create the "email_folder" table
    await queryInterface.createTable("email_folder", {
      id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
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
      next_page_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sync_status: {
        type: Sequelize.ENUM("FETCHING", "FETCHED", "STANDBY"),
        allowNull: false,
        defaultValue: "STANDBY",
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 99999999,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provider_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
    await queryInterface.addIndex(
      "email_folder",
      ["provider_id", "sync_status", "priority"],
      {
        indexName: "email_folder_provider_sync_priority_idx",
        order: [
          ["sync_status", "ASC"],
          ["priority", "ASC"],
        ],
      }
    );
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("email_folder");
  },
};
