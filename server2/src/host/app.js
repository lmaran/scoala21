const express = require("express");

const api = require("../api/app");
const web = require("../web/app");
const admin = require("../admin/app");

const app = express();

app.use("/api", api);
app.use("/admin", admin);
app.use("/", web);

module.exports = app;
