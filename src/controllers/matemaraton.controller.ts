import { Request, Response } from "express";

export const matemaratonController = {
    getMatemaraton: async (req: Request, res: Response) => {
        var data = {
            ctx: req.ctx,
        };
        res.render("matemaraton/matemaraton", data);
    },
};
