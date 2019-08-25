const express = require("express");
const path = require("path");

const api = require("../api/app");
const web = require("../web/app");
const matemaraton = require("../matemaraton/app");
const gradebook = require("../gradebook/app");
const timetable = require("../timetable/app");
// const admin = require("../admin/app");

const app = express();

// routes for static files; in prod set NGINX to serve them
// app.use("/", express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })); // one year in milliseconds
app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/lib/lit-html", express.static(path.join(__dirname, "../../node_modules/lit-html")));

app.get("/check", function(req, res) {
    res.send("scoala21-" + (process.env.DEPLOYMENT_SLOT || "noslot") + "-" + process.env.NODE_ENV);
});

app.use("/api", api);

app.use("/catalog", gradebook);
app.use("/orar", timetable);
//app.use("/admin", admin);

// redirect MateMaraton: scoala21.ro/matemaraton/<url> --> matemaraton.ro/<url>
app.use((req, res, next) => {
    const requestSegments = req.originalUrl.split("/"); // ["", "matemaraton", "prezenta", "8-avansati"]
    const newUrlSegments = requestSegments.filter(x => x !== "" && x !== "matemaraton"); // ["prezenta", "8-avansati"]
    const newUrl = newUrlSegments.join("/"); // "prezenta/8-avansati"

    if (requestSegments[1] === "matemaraton") {
        return res.redirect(301, "https://matemaraton.ro/" + newUrl);
    }
    next();
});
// app.use("/matemaraton", matemaraton);

app.use("/", web);

module.exports = app;
