"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const exphbs = require("express-handlebars");
const setContext_middleware_1 = require("./middlewares/setContext.middleware");
var e = require("express");
const app = express();
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "/views/layouts/"),
    partialsDir: path.join(__dirname, "/views/partials/"),
    helpers: {
        section: function (name, options) {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        },
        eq: function (v1, v2) {
            return v1 === v2;
        },
        toJson: function (object) {
            return JSON.stringify(object);
        },
    },
}));
app.use("/admin", express.static(path.join(__dirname, "../../client/dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(setContext_middleware_1.setContext);
app.use(middlewares_1.httpLogHandler);
app.use("/", routes_1.default);
app.use(middlewares_1.catch404);
app.use(middlewares_1.errorHandler);
exports.default = app;
