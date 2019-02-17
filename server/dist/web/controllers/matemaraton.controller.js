exports.getMatemaraton = async (req, res) => {
    const data = {
        // ctx: req.ctx,
    };
    res.render("matemaraton/matemaraton", data);
};
