const { Pool } = require("pg");
const path = require("path");
const fs = require("fs");

const certsPath = path.join(__dirname, "../../../../../certs");
const caCert = fs.readFileSync(path.join(certsPath, "ca.crt"));
const clientCert = fs.readFileSync(path.join(certsPath, "client.root.crt"));
const clientKey = fs.readFileSync(path.join(certsPath, "client.root.key"));

const pool = new Pool({
  host: "localhost",
  port: 26257,
  user: "root",
  password: null,
  max: 20,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
  ssl: {
    // rejectUnauthorized: false,
    ca: caCert,
    cert: clientCert,
    key: clientKey,
  },
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

const userDatabase = require("./user.db");
const userDb = userDatabase({ conn: pool });

const folderDatabase = require("./folder.db");
const folderDb = folderDatabase({ conn: pool });

const emailDatabase = require("./email.db");
const emaildb = emailDatabase({ conn: pool });


const emailFolderAssociationsDatabase = require("./email-folder-association.db");
const emailFolderAssociationsDb = emailFolderAssociationsDatabase({
  conn: pool,
});

const attachmentDatabase = require("./attachment.db");
const attachmentDb = attachmentDatabase({ conn: pool });

const recipientDatabase = require("./recipient.db");
const recipientDb = recipientDatabase({ conn: pool });

module.exports = Object.freeze({
  userDb,
  folderDb,
  emaildb,
  emailFolderAssociationsDb,
  attachmentDb,
  recipientDb,
});
