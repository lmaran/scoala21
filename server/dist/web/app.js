//const express = require("express");
//const path = require("path");
//const logger = require("morgan");
//const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");

//const routes = require("./routes");

// API Express App
// ---------------

//const app = express();
//app.use(logger("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// Routes
// ------

//app.use("/", routes);

// Exports
// -------

//module.exports = app;

// import * as express from "express";
const express = require("express");
// import * as path from "path";
const path = require("path");
// import { catch404, errorHandler, httpLogHandler } from "./middlewares";
// import allRoutes from "./routes";
const routes = require("./routes");
// import * as exphbs from "express-handlebars";
const exphbs = require("express-handlebars");
const setContext = require("./middlewares/setContext.middleware").setContext;

const app = express();

// view engine setup
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));
app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: path.join(__dirname, "/views/layouts/"),
        partialsDir: path.join(__dirname, "/views/partials/"),

        // ensure the javascript is at the bottom of the code in express-handlebars template
        // http://stackoverflow.com/a/25307270, http://stackoverflow.com/a/21740214
        helpers: {
            // tslint:disable-next-line:object-literal-shorthand
            section: function (name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            },
            toJson: function (object) {
                return JSON.stringify(object);
            },
            eq: function (v1, v2) {
                return v1 === v2;
            },
            ne: function (v1, v2) {
                return v1 !== v2;
            },
            lt: function (v1, v2) {
                return v1 < v2;
            },
            gt: function (v1, v2) {
                return v1 > v2;
            },
            lte: function (v1, v2) {
                return v1 <= v2;
            },
            gte: function (v1, v2) {
                return v1 >= v2;
            },
            and: function () {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).every(Boolean);
            },
            or: function () {
                return Array.prototype.slice.call(arguments, 0, arguments.length - 1).some(Boolean);
            }
        }
    })
);

// angular static files
app.use("/admin", express.static(path.join(__dirname, "../../../client/dist")));

app.use(express.static(path.join(__dirname, "public")));

app.use(setContext); // adds requestId, tokenCode and other properties to the request object

// app.use(httpLogHandler);

app.use("/", routes);
// // angular routes: not found in static files, so default to index.html
// app.get("/admin/*", (req, res) => {
//     const file = path.join(__dirname, "../../client/dist/index.html");
//     res.sendFile(file);
// });

// catch 404 and forward to error handler
// app.use(catch404);

// app.use(errorHandler);

// "uncaughtException" and "unhandledRejection" are caught in server.ts

module.exports = app;
