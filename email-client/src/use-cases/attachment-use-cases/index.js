const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const { gmailServices } = require("../../external-service-call");
const { attachmentDb } = require("../../data-access");

const makeFetchEmailAttachments = require("./fetch-email-attachment");
const fetchEmailAttachments = makeFetchEmailAttachments({
  Joi,
  ValidationError,
  getEmailAttachment: gmailServices.getEmailAttachment,
});

const makeWriteAttachmentFile = require("./write-attachment-file");
const writeAttachmentFile = makeWriteAttachmentFile({ fs, path, Joi });

const makeCreateAttachment = require("./create-attachment");
const createAttachment = makeCreateAttachment({
  Joi,
  ValidationError,
  attachmentDb,
});

module.exports = Object.freeze({
  fetchEmailAttachments,
  writeAttachmentFile,
  createAttachment,
});
