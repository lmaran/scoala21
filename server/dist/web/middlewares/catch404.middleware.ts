// catch 404 and forward to error handler
import { NextFunction, Request, Response } from "express";
import { PageNotFound } from "../errors";

export const catch404 = (req: Request, res: Response, next: NextFunction) => {
    const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
    next(err);
};
