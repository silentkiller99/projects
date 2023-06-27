const express = require("express");
const app = express();
const path = require("path");
// const config = require("./config");
const routes = require("./rest-service");
// const EventEmitter = require("events");
// const myEmitter = new EventEmitter();
// set the maximum listener limit for the 'myEvent' event to 20
// myEmitter.setMaxListeners(100);

// require("./handlers/create-default-folder.handler");

// require("./crons/update-access-token.cron");
// require("./handlers/update-access-token.handler");

require("./handlers/fetch-user-folder.handler");
require("./handlers/fetch-folder-mails.handler");
require("./handlers/fetch-mail-attachment.handler");

const { trimRequestBody } = require("./middleware/trim-req-body");
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(trimRequestBody);
const port = 5000;
app.listen(port, function () {
  console.log(`server running on port ${port}.....`);
});

app.use("/", routes);
app.use(async (req, res) => {
  res.status(404).json("invalid route");
});
