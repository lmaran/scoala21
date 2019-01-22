#!/usr/bin/env node

/**
 * Module dependencies.
 */
//const xx = 123;

// xx = xx + 1;
//console.log(xx);
//const xaaaab = 1;

const app = require("./app");
const debug = require("debug")("host:server");
const http = require("http");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    //const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            //console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            //console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);

    const config = {
        port: 3000,
        env: "DEVELOPMENT",
    };
    // https://github.com/voorhoede/front-end-tooling-recipes/blob/master/express-with-nodemon-browsersync/index.js
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    if (`${config.env}` === "DEVELOPMENT") {
        const browserSync = require("browser-sync");
        browserSync({
            files: ["app.js"],
            online: true, // to have also an external url as 192.168.1.17:1417 for testing on mobile
            open: false,
            port: config.port + 1,
            proxy: "localhost:" + config.port,
            ui: false,
        });
    }
}
