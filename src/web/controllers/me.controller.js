const personService = require("../../shared/services/person.service");

exports.getMyPage = async (req, res) => {
    const user = req.ctx && req.ctx.user;
    if (!user) res.send("Not authenticated!");

    const parent = await personService.getOneById(user.parentId);
    // parent.firstNameFirstChar = parent.firstName.charAt(0);

    const data = {
        ctx: req.ctx,
        parent
    };
    // res.send(data);
    res.render("me/my-page", data);
};
