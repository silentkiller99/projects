const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", routes);
app.use("/display", routes);


app.listen(5000, function () {
  console.log("server running on port 5000");
});
