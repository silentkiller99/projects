const express = require("express");
const routes = express.Router();
const { isValidInput } = require("../utils/validateInput");
const {
  upload,
  uploadDetails,
  readAll,
  read,
  downloadFile,
  viewFile,
    updateDetails,
  deleteUser,
} = require("../controllers/routeControllers");

routes.post("/", upload.single("file"), isValidInput, uploadDetails);
routes.get("/users", readAll);
routes.get("/users/:id", read);
routes.get("/download/:id", downloadFile);
routes.get("/view/:id", viewFile);
routes.put("/users/:id", upload.single("file"), isValidInput, updateDetails);
routes.delete("/users/:id", deleteUser);
module.exports = routes;
