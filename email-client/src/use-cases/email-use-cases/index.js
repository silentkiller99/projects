const Joi = require("joi");
const qs = require("qs");
const b64Decode = require("base-64").decode;
const cheerio = require("cheerio");
const path = require("path");
const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const { gmailServices } = require("../../external-service-call");
const config = require("../../config");
const { kafkaProducer } = require("../kafka-use-cases");
const { emaildb } = require("../../data-access");

const makeFetchFolderEmails = require("./fetch-folder-emails");

const fetchFolderEmails = makeFetchFolderEmails({
  Joi,
  NoDataFound,
  ValidationError,
  getFolderEmails: gmailServices.fetchFolderEmails,
});

const makeCreateEmail = require("./create-email");
const createEmail = makeCreateEmail({
  Joi,
  ValidationError,
  emaildb,
  kafkaProducer,
  config,
});

const makeGetEmailByMessageId = require("./get-email-by-message-id");
const getEmailByMessageId = makeGetEmailByMessageId({
  Joi,
  ValidationError,
  emaildb,
});

const makeFormatEmail = require("./format-email");
const formatEmail = makeFormatEmail({ b64Decode, qs });

const makeFormatEmailBody = require("./format-email-body");
const formatEmailBody = makeFormatEmailBody({
  Joi,
  ValidationError,
  cheerio,
  path,
});

module.exports = Object.freeze({
  fetchFolderEmails,
  createEmail,
  getEmailByMessageId,
  formatEmailBody,
  formatEmail,
});
