#!/usr/bin/env node

const app = require("./host/app");
// const debug = require("debug")("host:server");
const http = require("http");
const config = require("./shared/config");

/**
 * Get port from environment and store in Express.
 */

// const port = normalizePort(process.env.PORT || "3000");
app.set("port", config.port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(config.port);
server.on("error", onError);
server.on("listening", onListening);

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
    console.log("Listening on " + bind);

    //   console.log(config);

    // const config = {
    //     port: 3000,
    //     env: "development"
    // };
    // https://github.com/voorhoede/front-end-tooling-recipes/blob/master/express-with-nodemon-browsersync/index.js
    // https://ponyfoo.com/articles/a-browsersync-primer#inside-a-node-application
    if (`${config.env}` === "development") {
        const browserSync = require("browser-sync");
        browserSync({
            files: ["*.js"],
            online: true, // to have also an external url as 192.168.1.17:1417 for testing on mobile
            open: false,
            port: config.port + 1,
            proxy: "localhost:" + config.port,
            ui: false
        });
    }
}
