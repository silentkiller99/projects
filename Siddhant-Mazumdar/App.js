const express = require("express");
const app = express();
const routes = require("./Routes/Routes");
const { trimRequestBody } = require("./Utils/TrimReqBody");
require("./Config/Db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(trimRequestBody);
app.use("/", routes);

app.use("/createUser", routes);
app.use("/getUsers", routes);
app.use("/updateUser", routes);
app.use("/deleteUser/:id", routes);

app.use("/createFolder", routes);
app.use("/getFolders/:id", routes);
app.use("/updateFolder/:id/:name", routes);
app.use("/folders/:id/:name", routes);

app.listen(5000, function () {
  console.log("server running on port 5000.....");
});
