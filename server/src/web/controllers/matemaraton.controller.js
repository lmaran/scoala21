const matemaratonService = require("../services/matemaraton.service");
const { PageNotFound } = require("../../shared/errors/all.errors");
const dateTimeHelper = require("../../shared/helpers/date-time.helper");

exports.getMatemaraton = async (req, res) => {
    const data = {
        // ctx: req.ctx,
    };
    res.render("matemaraton/matemaraton", data);
};

exports.getPresencePerGroup = async (req, res, next) => {
    const groupId = req.params.id;
    const routeParamWhitelist = ["cls8-avansati", "cls8-incepatori", "cls5-avansati"];

    if (!routeParamWhitelist.includes(groupId)) {
        const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
        return next(err);
    }

    // const presence = await matemaratonService.getLastPresence(groupId);
    const presencePerGroup = await matemaratonService.getPresencePerGroup(groupId);
    const students = await matemaratonService.getStudents();

    // met 1:
    //const [a, b] = [presencePerGroup, students];

    // met 2:
    const [aa, bb] = await Promise.all([presencePerGroup, students]);

    console.log("========== a");
    console.log(aa);
    console.log("========== b");
    console.log(bb);

    presencePerGroup.forEach(presence => {
        presence.date = dateTimeHelper.getStringFromString(presence.date);
    });

    // presence.date = dateTimeHelper.getStringFromString(presence.date);
    const data = {
        groupName: getGroupNameById(groupId),
        // presence: presence,
        presencePerGroup: presencePerGroup
    };
    res.render("matemaraton/presence-per-group", data);
};

exports.getPresencePerStudent = async (req, res, next) => {
    const studentId = req.params.id;

    const presencePerStudent = await matemaratonService.getPresencePerStudent(studentId);

    const data = {
        // groupName: getGroupNameById(groupId),
        // allPresences: allPresences
        student: studentId,
        presencePerStudent
    };
    res.render("matemaraton/presence-per-student", data);
};

const getGroupNameById = groupId => {
    if (groupId === "cls8-avansati") return "Cls 8, Avansati";
    else if (groupId === "cls8-incepatori") return "Cls 8, Incepatori";
    else if (groupId === "cls5-avansati") return "Cls 5, Avansati";
    else return "Grup necunoscut";
};
