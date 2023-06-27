const userUseCases = require("./user-use-cases");
const folderUseCases = require("./folder-use-cases");
const authUseCases = require("./auth-use-cases");
const emailUseCases = require("./email-use-cases");
const emailFolderAssociationUseCases = require("./email-folder-associations-use-cases");
const attachmentUseCases = require("./attachment-use-cases");
const emailRecipientsUsecase = require("./email-recipient-use-case");
const { kafkaProducer } = require("./kafka-use-cases");

module.exports = Object.freeze({
  userUseCases,
  folderUseCases,
  authUseCases,
  emailUseCases,
  emailFolderAssociationUseCases,
  attachmentUseCases,
  emailRecipientsUsecase,
  kafkaProducer,
});
