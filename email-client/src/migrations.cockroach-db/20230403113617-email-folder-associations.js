"use strict";

const { Sequelize, DataTypes } = require("sequelize-cockroachdb");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("email_folder_associations", {
      id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
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
      folder_id: {
        type: Sequelize.UUID,
        references: {
          model: "email_folder",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down({ context: queryInterface }) {
    await queryInterface.dropTable("email_folder_associations");
  },
};
