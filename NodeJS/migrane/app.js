const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/routes");
const User = require("./migrations/20230224115140-create-user");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
User.sync()
  .then(() => {
    console.log("User table created successfully.");
  })
  .catch((error) => {
    console.error("Error while creating User table:", error);
  });

app.use("/", routes);
app.use("/users", routes);
app.use("/users/:id", routes);
app.use("download/:id", routes);
app.use("view/:id", routes);
app.put("/users/:id", routes);
app.delete("/users/:id", routes);

app.listen(5000, function () {
  console.log("server running on port 5000");
});
