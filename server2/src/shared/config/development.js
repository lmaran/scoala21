const constants = require("../constants/core.constants");
const LogLevel = constants.LogLevel;
const LogDetail = constants.LogDetail;

module.exports = {
    mongo: {
        uri: "mongodb://localhost",
        dbName: "scoala21-dev",
    },
    rollbarToken: "<rollbarToken>",
    logglyToken: "<logglyToken>",
    logglySubdomain: "<logglySubdomain>",
    logLevel: LogLevel.DEBUG,
    httpLogDetails: {
        request: {
            general: LogDetail.PARTIAL,
            headers: LogDetail.NONE,
            body: false,
        },
        response: {
            general: false,
            headers: false,
            body: false,
        },
    },
};
