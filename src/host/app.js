const express = require("express");

const api = require("../api/app");
const web = require("../web/app");
const matemaraton = require("../matemaraton/app");
const gradebook = require("../gradebook/app");
const timetable = require("../timetable/app");
// const admin = require("../admin/app");

const app = express();

app.get("/check", function (req, res) {
    res.send("scoala21-" + (process.env.DEPLOYMENT_SLOT || "noslot") + "-" + process.env.NODE_ENV);
});

app.use("/api", api);
app.use("/matemaraton", matemaraton);
app.use("/catalog", gradebook);
app.use("/orar", timetable);
//app.use("/admin", admin);
app.use("/", web);

module.exports = app;
