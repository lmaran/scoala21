import * as express from "express";
import * as path from "path";
import { catch404, errorHandler, httpLogHandler } from "./middlewares";
import allRoutes from "./routes";
import * as exphbs from "express-handlebars";
var e = require("express");

const app: express.Application = express();

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
            section: function(this: any, name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            },
        },
    })
);

app.use(express.static(path.join(__dirname, "public")));

app.use(httpLogHandler);

app.use("/", allRoutes);

// catch 404 and forward to error handler
app.use(catch404);

app.use(errorHandler);

// "uncaughtException" and "unhandledRejection" are caught in server.ts

export default app;
