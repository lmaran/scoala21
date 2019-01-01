import { Request, Response } from "express";

export const matemaratonController = {
    getMatemaraton: async (req: Request, res: Response) => {
        res.render("matemaraton/matemaraton", {});
    },
};
