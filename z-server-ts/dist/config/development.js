"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    mongo: {
        uri: "mongodb://localhost",
        dbName: "scoala21-dev",
    },
    rollbarToken: "<rollbarToken>",
    logglyToken: "<logglyToken>",
    logglySubdomain: "<logglySubdomain>",
    logLevel: "debug",
    httpLogDetails: {
        request: {
            general: "partial",
            headers: "none",
            body: false,
        },
        response: {
            general: false,
            headers: false,
            body: false,
        },
    },
};
exports.default = config;
//# sourceMappingURL=development.js.map