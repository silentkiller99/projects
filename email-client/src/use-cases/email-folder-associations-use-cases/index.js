const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const Joi = require("joi");
const { emailFolderAssociationsDb } = require("../../data-access");

const makeCreateEmailFolderAssociation = require("./create-associations");
const createEmailFolderAssociation = makeCreateEmailFolderAssociation({
  Joi,
  ValidationError,
  emailFolderAssociationsDb,
});

module.exports = Object.freeze({ createEmailFolderAssociation });
