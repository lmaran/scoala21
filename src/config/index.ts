import * as _ from "lodash";
import { EnvironmentType, LogDetail, LogLevel } from "../constants";
import { IEnvConfig } from "../interfaces";

const env: string = (process.env.NODE_ENV || EnvironmentType.DEVELOPMENT).toLowerCase();
const envConfig: IEnvConfig = require(`./${env}`).default;

const common: IEnvConfig = {
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

    logLevel: process.env.LOG_LEVEL || LogLevel.WARNING,

    httpLogDetails: {
        request: {
            general: process.env.HTTP_LOG_DETAILS_REQUEST_GENERAL || LogDetail.FULL,
            headers: process.env.HTTP_LOG_DETAILS_REQUEST_HEADERS || LogDetail.PARTIAL,
            body: (process.env.HTTP_LOG_DETAILS_REQUEST_BODY as boolean | undefined) || false,
        },
        response: {
            general: (process.env.HTTP_LOG_DETAILS_RESPONSE_GENERAL as boolean | undefined) || false,
            headers: (process.env.HTTP_LOG_DETAILS_RESPONSE_HEADERS as boolean | undefined) || false,
            body: (process.env.HTTP_LOG_DETAILS_RESPONSE_BODY as boolean | undefined) || false,
        },
    },
};

// Merge a `source` object to a `target` recursively
// https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
const merge = (target, source) => {
    // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
    for (let key of Object.keys(source)) {
        if (source[key] instanceof Object) Object.assign(source[key], merge(target[key], source[key]));
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
};

// merge the two config objects
// const config = { ...common, ...envConfig }; // ok, but not recursively
const config = merge(common, envConfig);

export default config;
