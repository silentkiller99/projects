const {
  userDb,
  folderDb,
  emaildb,
  emailFolderAssociationsDb,
  attachmentDb,
  recipientDb,
} = require("./cockroach-db");
// const { userDb, folderDb } = require("./mysql-db");
module.exports = Object.freeze({
  userDb,
  folderDb,
  emaildb,
  emailFolderAssociationsDb,
  attachmentDb,
  recipientDb,
});
