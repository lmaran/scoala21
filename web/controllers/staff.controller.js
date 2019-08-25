const staffService = require("../../shared/services/staff.service");

exports.getAll = async (req, res) => {
    const staff = await staffService.getAll();

    const data = {
        //ctx: req.ctx,
        staff: staff
    };

    res.render("staff/staff", data);
};
