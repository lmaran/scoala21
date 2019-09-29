const personService = require("../../shared/services/person.service");

exports.getAll = async (req, res) => {
    const staff = await personService.getStaffMembers();

    const principals = staff
        .filter(x => x.isPrincipal || x.isVicePrincipal)
        .map(x => {
            if (x.isPrincipal) {
                x.principalTitle = "director";
            } else {
                x.principalTitle = "director adjunct";
            }
            return x;
        })
        // We force a.attr to be a string to avoid exceptions.
        // https://stackoverflow.com/a/51169
        .sort((a, b) => "" + a.principalTitle.localeCompare(b.principalTitle));

    const data = {
        ctx: req.ctx,
        staff,
        principals
    };

    // res.send(data);
    res.render("staff/staff", data);
};
