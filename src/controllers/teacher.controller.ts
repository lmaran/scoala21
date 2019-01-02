import { Request, Response } from "express";
import { teacherService } from "../services";

// https://stackoverflow.com/a/46431916
const groupBy = (items, key) =>
    items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
        }),
        {}
    );

export const teacherController = {
    getAll: async (req: Request, res: Response) => {
        const teachers = await teacherService.getAll();
        const teachersByArea = groupBy(teachers, "area");

        var data = {
            teachersByArea: teachersByArea,
            ctx: req.ctx,
        };

        res.render("teacher/teachers", data);
    },
};
