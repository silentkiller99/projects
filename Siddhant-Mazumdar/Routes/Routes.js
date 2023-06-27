const express = require("express");
const routes = express.Router();
const {
  checkConnection,
  createUser,
  readUsers,
  updateUserDetails,
  deleteUser,
} = require("../Controllers/UserControllers");
const {
  createFolder,
  readFolders,
  updateFolderDetails,
  deleteFolder,
} = require("../Controllers/FolderControllers");
const {
  createUserValidation,
  updateUserValidation,
  createFolderValidation,
  updateFolderValidation,
} = require("../Utils/Validations");
routes.get("/", checkConnection);
routes.post("/createUser", createUserValidation, createUser);
routes.get("/getUsers", readUsers);
routes.put("/updateUser/:id", updateUserValidation, updateUserDetails);
routes.delete("/deleteUser/:id", deleteUser);
routes.post("/createFolder", createFolderValidation, createFolder);
routes.get("/getFolders/:id", readFolders);
routes.put("/updateFolder/:id", updateFolderValidation, updateFolderDetails);
routes.delete("/deleteFolders/:id", deleteFolder);

module.exports = routes;
