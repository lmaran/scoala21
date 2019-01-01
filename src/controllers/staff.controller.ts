import { Request, Response } from "express";
import { staffService } from "../services";

export const staffController = {
    getAll: async (req: Request, res: Response) => {
        const staff = await staffService.getAll();

        var context = {
            staff: staff,
        };

        res.render("staff/staff", context);
    },
};
