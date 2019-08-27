const constants = require("../constants/core.constants");
const LogLevel = constants.LogLevel;
const LogDetail = constants.LogDetail;

const config = {
    mongo_uri: "mongodb://localhost/scoala21-dev",
    mongo_dbName: "scoala21-dev",
    session_secret: "node-fullstack-secret",
    rollbarToken: "<rollbarToken>",
    logglyToken: "<logglyToken>",
    logglySubdomain: "<logglySubdomain>",
    logLevel: LogLevel.DEBUG,
    httpLogDetails: {
        request: {
            general: LogDetail.PARTIAL,
            headers: LogDetail.NONE,
            body: false
        },
        response: {
            general: false,
            headers: false,
            body: false
        }
    }
};

module.exports = config;
