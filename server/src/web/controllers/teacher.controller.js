const teacherService = require("../services/teacher.service");

// https://stackoverflow.com/a/46431916
const groupBy = (items, key) =>
    items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [...(result[item[key]] || []), item],
        }),
        {},
    );

exports.getAll = async (req, res) => {
    const teachers = await teacherService.getAll();
    const teachersByArea = groupBy(teachers, "area");

    const data = {
        teachersByArea: teachersByArea,
        ctx: req.ctx,
    };

    res.render("teacher/teachers", data);
};
