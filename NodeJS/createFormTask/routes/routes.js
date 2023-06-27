const express = require("express");
const routes = express.Router();
const { isValidInput } = require("../validations/validateInput");
const {
  form,
  getDetails,
  displayDetails,
  downloadFile,
  upload,
  viewFile,
} = require("../controllers/formcontroller.js");

routes.get("/", form);

routes.post("/", upload.single("file"), isValidInput, getDetails);
routes.get("/display", displayDetails);
routes.get("/download/:id", downloadFile);
routes.get("/view/:id", viewFile);
module.exports = routes;
