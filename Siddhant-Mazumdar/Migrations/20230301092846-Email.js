"use strict";

const { Sequelize } = require("sequelize");
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("Email", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      bodyType: {
        type: Sequelize.ENUM(["TEXT", "HTML"]),
        allowNull: false,
      },

      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      snippet: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      inReplyTo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scheduledAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      threadId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      messageId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      isRead: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdIt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      isArch: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isTrashed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });

    await queryInterface.addIndex("Email", ["subject"], {
      indexName: "subjectIndex",
      using: "BTREE",
    });
    await queryInterface.addIndex("Email", ["threadId"], {
      indexName: "threadIdIndex",
      using: "BTREE",
    });
    await queryInterface.addIndex("Email", ["isArch"], {
      indexName: "isArchIndex",
      using: "BTREE",
    });
    await queryInterface.addIndex("Email", ["isTrashed"], {
      indexName: "isTrashedIndex",
      using: "BTREE",
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex("Email", "subjectIndex");
    await queryInterface.removeIndex("Email", "threadIdIndex");
    await queryInterface.removeIndex("Email", "isArchIndex");
    await queryInterface.removeIndex("Email", "isTrashedIndex");
    await queryInterface.dropTable("Email");
  },
};
