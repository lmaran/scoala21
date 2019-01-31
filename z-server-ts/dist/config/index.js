"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = (process.env.NODE_ENV || "development").toLowerCase();
const envConfig = require(`./${env}`).default;
const common = {
    env,
    port: process.env.PORT || 1416,
    mongo: {
        uri: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB_NAME,
        options: { useNewUrlParser: true },
    },
    rollbarToken: process.env.ROLLBAR_TOKEN,
    logglyToken: process.env.LOGGLY_TOKEN,
    logglySubdomain: process.env.LOGGLY_SUBDOMAIN,
    logLevel: process.env.LOG_LEVEL || "warning",
    httpLogDetails: {
        request: {
            general: process.env.HTTP_LOG_DETAILS_REQUEST_GENERAL || "full",
            headers: process.env.HTTP_LOG_DETAILS_REQUEST_HEADERS || "partial",
            body: process.env.HTTP_LOG_DETAILS_REQUEST_BODY || false,
        },
        response: {
            general: process.env.HTTP_LOG_DETAILS_RESPONSE_GENERAL || false,
            headers: process.env.HTTP_LOG_DETAILS_RESPONSE_HEADERS || false,
            body: process.env.HTTP_LOG_DETAILS_RESPONSE_BODY || false,
        },
    },
};
const merge = (target, source) => {
    for (let key of Object.keys(source)) {
        if (source[key] instanceof Object)
            Object.assign(source[key], merge(target[key], source[key]));
    }
    Object.assign(target || {}, source);
    return target;
};
const config = merge(common, envConfig);
exports.default = config;
//# sourceMappingURL=index.js.map