const express = require("express");
const router = express.Router();
const {
  userController,
  folderController,
  loginController,
} = require("./controllers");
// const config = require("./config");

function init() {
  Oauth();
  userRoutes();
  folderRoutes();
}

function Oauth() {
  router.get("/auth/google", loginController.googleLogin);
}

function userRoutes() {
  router.post("/users", userController.createUserAction);
  router.get("/users", userController.getAllUserAction);
  router.get("/users/:id", userController.getUserAction);
  router.put("/users/:id", userController.updateUserAction);
  router.delete("/users/:id", userController.deleteUserAction);
}
function folderRoutes() {
  router.post("/folders", folderController.createFolderAction);
  router.get("/folders/:id", folderController.getUserFolderAction);
  router.get("/folders", folderController.getUserFoldersAction);
  router.put("/folders/:id", folderController.updateFolderAction);
  router.delete("/folders/:id", folderController.deleteFolderAction);
}
init();
module.exports = router;
