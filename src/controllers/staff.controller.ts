import { Request, Response } from "express";
import { staffService } from "../services";

export const staffController = {
    getAll: async (req: Request, res: Response) => {
        const staff = await staffService.getAll();

        var data = {
            ctx: req.ctx,
            staff: staff,
        };

        res.render("staff/staff", data);
    },
};
