"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createLogger, format, transports } = require("winston");
const config_1 = require("../config");
const winston_rollbar_transport2_1 = require("./winston-rollbar.transport2");
const rollbarOptions = {
    accessToken: config_1.default.rollbarToken,
    reportLevel: "warning",
    environment: config_1.default.env,
    scrubFields: ["password", "oldPassword", "newPassword", "hashedPassword", "salt"],
};
const logger = createLogger({});
if (config_1.default.env === "production" || config_1.default.env === "staging") {
    logger.add(new winston_rollbar_transport2_1.Rollbar({ rollbarConfig: rollbarOptions }));
}
else {
    const formatterFunc = require("./winston-console.formatter").formatterFunc;
    const ignorePrivate = format((info, opts) => {
        if (info.private) {
            return false;
        }
        return info;
    });
    const myFormat = format.printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });
    const consoleOptions = {
        level: "debug",
    };
    logger.add(new transports.Console(consoleOptions));
}
exports.default = logger;
//# sourceMappingURL=logger.js.map