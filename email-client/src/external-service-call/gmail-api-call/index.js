const axios = require("axios");
const qs = require("qs");

const getUserFoldersService = require("./get-user-folders");
const getFolderEmailsService = require("./get-folder-emails");
const getEmailAttachmentService = require("./get-email-attachment");

const getUserFolders = getUserFoldersService({ axios, qs });
const fetchFolderEmails = getFolderEmailsService({ axios, qs });
const getEmailAttachment = getEmailAttachmentService({ axios, qs });

module.exports = Object.freeze({
  fetchFolderEmails,
  getUserFolders,
  getEmailAttachment,
});
