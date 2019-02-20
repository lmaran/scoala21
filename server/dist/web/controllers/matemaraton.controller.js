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
    const routeParamWhitelist = ["8-avansati", "8-incepatori", "5-avansati"];

    if (!routeParamWhitelist.includes(groupId)) {
        const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
        return next(err);
    }

    const [grade, groupName] = groupId.split("-");

    // const presence = await matemaratonService.getLastPresence(groupId);
    // const presencePerGroup = await matemaratonService.getPresencePerGroup(groupId);
    // const students = await matemaratonService.getStudents();

    // met 1:
    //const [a, b] = [presencePerGroup, students];

    // met 2:
    // const [presencePerGroup, students] = await Promise.all([
    //     await matemaratonService.getPresencePerGroup(groupId),
    //     await matemaratonService.getStudents()
    // ]);

    // const cache = {};
    // presencePerGroup.forEach(presencePerGroup => {
    //     presencePerGroup.students.forEach(student => {
    //         const studentCode = student.name;
    //         let studentDetails;

    //         if (cache[studentCode]) {
    //             console.log(student.name + " from cache");
    //             studentDetails = cache[studentCode];
    //         } else {
    //             studentDetails = getStudentDetails(student, students);
    //             cache[studentCode] = studentDetails;
    //         }
    //         student.age = (studentDetails && studentDetails.class) || "xx";
    //     });
    // });

    // console.log("========== a");
    // console.log(presencePerGroup);
    // console.log("========== b");
    // console.log(students);

    // presencePerGroup.forEach(presence => {
    //     presence.date = dateTimeHelper.getStringFromString(presence.date);
    // });

    // presence.date = dateTimeHelper.getStringFromString(presence.date);
    // const data = {
    //     groupName: getGroupNameById(groupId),
    //     // presence: presence,
    //     presencePerGroup: presencePerGroup,
    //     students: students
    // };

    const period = "201819";
    const presencePerGroup = await matemaratonService.getPresencePerGroup(period, grade, groupName);

    const data = {
        grade,
        groupName,
        presencePerGroup
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

//let cache = {};

const getStudentDetails = (student, students) => {
    const studentCode = student.name;

    const studentDetails = students.find(x => x.shortName === studentCode);

    return studentDetails;
};
