const Joi = require("joi");
const ValidationError = require("../../exceptions/validation.error");

const makeCreateFolderAction = require("./create-folder.controller");
const getUserFoldersController = require("./get-user-folders.controller");
const getUserFolderController = require("./get-user-folder.controller");
const updateFolderController = require("./update-folder-controller");
const deleteFolderController = require("./delete-folder.controller");

const { folderUseCases } = require("../../use-cases");

const createFolderAction = makeCreateFolderAction({
  Joi,
  ValidationError,
  createFolder: folderUseCases.createFolder,
  getUserFolderByName: folderUseCases.getUserFolderByName,
});
const getUserFoldersAction = getUserFoldersController({
  Joi,
  ValidationError,
  getUserFolders: folderUseCases.getUserFolders,
});
const getUserFolderAction = getUserFolderController({
  Joi,
  ValidationError,
  getUserFolder: folderUseCases.getUserFolder,
});
const updateFolderAction = updateFolderController({
  Joi,
  ValidationError,
  updateFolder: folderUseCases.updateFolder,
  getUserFolder: folderUseCases.getUserFolder,
});
const deleteFolderAction = deleteFolderController({
  Joi,
  ValidationError,
  deleteFolder: folderUseCases.deleteFolder,
});
const folderControllers = Object.freeze({
  createFolderAction,
  getUserFoldersAction,
  getUserFolderAction,
  updateFolderAction,
  deleteFolderAction,
});
module.exports = folderControllers;
