import { Request, Response } from "express";

export const contactController = {
    getContact: async (req: Request, res: Response) => {
        var data = {
            ctx: req.ctx,
        };

        res.render("contact/contact", data);
    },
};
