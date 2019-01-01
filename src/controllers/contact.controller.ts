import { Request, Response } from "express";

export const contactController = {
    getContact: async (req: Request, res: Response) => {
        res.render("contact/contact", {});
    },
};
