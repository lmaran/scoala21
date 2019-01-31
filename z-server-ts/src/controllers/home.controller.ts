import { Request, Response } from "express";

export const homeController = {
    getHomePage: async (req: Request, res: Response) => {
        res.render("home", {});
    },
};
