const Joi = require("joi");
const lodash = require("lodash");
const { folderDb } = require("../../data-access");
const ValidationError = require("../../exceptions/validation.error");
const NoDataFound = require("../../exceptions/no-data-found.error");
const { gmailServices } = require("../../external-service-call");
const { kafkaProducer } = require("../kafka-use-cases");
const config = require("../../config");

const makeCreateFolder = require("./create-folder");
const makeCreateDefaultFolder = require("./create-default-folders");
const makeGetUserFolder = require("./get-user-folder");
const makeGetUserFolderByProviderId = require("./get-user-folder-by-provider-id");
const makeGetUserFolderByName = require("./get-user-folder-by-name");
const makeGetUserFolders = require("./get-user-folders");
const makeUpdateFolder = require("./update-folder");
const makeDeleteFolder = require("./delete-folder");
const makeFetchUserFolders = require("./fetch-user-folders");
const makeGetPriorityFolder = require("./get-priority-folder");

const createFolder = makeCreateFolder({
  Joi,
  folderDb,
  ValidationError,
  kafkaProducer,
  config,
});
const createDefaultFolders = makeCreateDefaultFolder({
  Joi,
  lodash,
  createFolder,
  ValidationError,
});
const getUserFolders = makeGetUserFolders({ Joi, folderDb, ValidationError });
const getUserFolder = makeGetUserFolder({
  Joi,
  folderDb,
  ValidationError,
  NoDataFound,
});
const getPriorityFolder = makeGetPriorityFolder({
  Joi,
  ValidationError,
  folderDb,
});
const getUserFolderByName = makeGetUserFolderByName({
  Joi,
  folderDb,
  ValidationError,
});
const getUserFolderByProviderId = makeGetUserFolderByProviderId({
  Joi,
  folderDb,
  ValidationError,
});
const updateFolder = makeUpdateFolder({
  Joi,
  folderDb,
  ValidationError,
});
const deleteFolder = makeDeleteFolder({
  Joi,
  folderDb,
  ValidationError,
  NoDataFound,
});
const fetchUserFolders = makeFetchUserFolders({
  Joi,
  ValidationError,
  NoDataFound,
  getUserFolders: gmailServices.getUserFolders,
});

module.exports = Object.freeze({
  createFolder,
  createDefaultFolders,
  getUserFolders,
  getPriorityFolder,
  getUserFolderByName,
  getUserFolderByProviderId,
  getUserFolder,
  updateFolder,
  deleteFolder,
  fetchUserFolders,
});
