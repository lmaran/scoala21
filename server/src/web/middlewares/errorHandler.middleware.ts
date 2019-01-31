import { NextFunction, Request, Response } from "express";
import { LogSource } from "../constants";
import { PageNotFound } from "../errors";
import { ApplicationError } from "../errors/application.error";
import logger from "../logger";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let meta: any;

    if (err instanceof ApplicationError) {
        res.status(err.status);

        meta = {
            // requestId: req.ctx.requestId,
            developerMessage: err.developerMessage,
            errorType: err.name,
            logSource: LogSource.ERROR_HANDLER,
            stack: err instanceof PageNotFound ? undefined : err.stack,
        };

        returnError(res, err, meta);
    } else if (err instanceof Error) {
        res.status(500);

        meta = {
            // requestId: req.ctx && req.ctx.requestId,
            errorType: err.name,
            logSource: LogSource.ERROR_HANDLER,
            stack: err.stack,
        };

        returnError(res, err, meta);
    }

    // so err is not an Error instance:
    else {
        res.status(500);

        meta = {
            // requestId: req.ctx.requestId,
            errorType: "UnknownError",
            logSource: LogSource.ERROR_HANDLER,
        };

        err = new Error(err || "Eroare necunoscuta");

        returnError(res, err, meta);
    }
};

function returnError(res: Response, err: Error, meta: any) {
    logger.error(err.message, meta);
    return res.json({ error: err.message });
}
