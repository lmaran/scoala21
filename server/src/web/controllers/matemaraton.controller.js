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
    // const presencePerGroups = await matemaratonService.getPresencePerGroup(groupId);
    // const students = await matemaratonService.getStudents();

    // met 1:
    //const [a, b] = [presencePerGroups, students];

    // met 2:
    // const [presencePerGroups, students] = await Promise.all([
    //     await matemaratonService.getPresencePerGroup(groupId),
    //     await matemaratonService.getStudents()
    // ]);

    // const cache = {};
    // presencePerGroups.forEach(presencePerGroups => {
    //     presencePerGroups.students.forEach(student => {
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
    // console.log(presencePerGroups);
    // console.log("========== b");
    // console.log(students);

    // presencePerGroups.forEach(presence => {
    //     presence.date = dateTimeHelper.getStringFromString(presence.date);
    // });

    // presence.date = dateTimeHelper.getStringFromString(presence.date);
    // const data = {
    //     groupName: getGroupNameById(groupId),
    //     // presence: presence,
    //     presencePerGroups: presencePerGroups,
    //     students: students
    // };

    const period = "201819";
    let presencePerGroups = await matemaratonService.getPresencePerGroup(period, grade, groupName);

    const totalCourses = getTotalCourses(presencePerGroups);

    const presencePerStudentsObj = getPresencePerStudentsObjWithTotal(presencePerGroups, totalCourses);

    console.log(presencePerStudentsObj);

    presencePerGroups.forEach(presence => {
        presence.dateAsString = dateTimeHelper.getStringFromStringNoDay(presence.date);

        if (presence.students) {
            // add 'totalPresences' (as a new property)
            presence.students.forEach(student => {
                student.totalPresences = presencePerStudentsObj[student.id].totalPresences;
                student.totalPresencesAsPercent = presencePerStudentsObj[student.id].totalPresencesAsPercent;
            });

            // sort by 'totalPresences' (desc), then by 'shortName' (asc);
            presence.students = presence.students.sort(sortByPresence);
        }
    });

    presencePerGroups = presencePerGroups.sort((a, b) => (a.date > b.date ? -1 : 1)); // sort by date, desc

    const presencePerStudents = Object.keys(presencePerStudentsObj)
        .map(key => presencePerStudentsObj[key])
        .sort(sortByPresence);

    const totalStudents = presencePerStudents.length;

    const data = {
        grade,
        groupName,
        presencePerGroups,
        presencePerStudents,
        totalCourses,
        totalStudents
    };
    res.render("matemaraton/presence-per-group", data);
};

exports.getPresencePerStudent = async (req, res) => {
    const studentId = req.params.id;
    const period = "201819";

    // const presencePerStudent = await matemaratonService.getPresencePerStudent(period, studentId);
    let presencePerPeriod = await matemaratonService.getPresencePerPeriod(period);

    let selectedStudentAtLatestPresence = null;

    presencePerPeriod.forEach(line => {
        line.dateAsString = dateTimeHelper.getStringFromStringNoDay(line.date);
        if (line.students) {
            const studentFound = line.students.find(x => x.id === studentId);
            if (studentFound) {
                line.presence = true;

                // extract student info from its latest presence
                if (!selectedStudentAtLatestPresence) {
                    selectedStudentAtLatestPresence = studentFound;
                    selectedStudentAtLatestPresence.grade = line.grade;
                    selectedStudentAtLatestPresence.groupName = line.groupName;
                }
            }
        }
        line.students = null;
    });

    // ditch the grades and groups the student do not belong
    presencePerPeriod = presencePerPeriod.filter(
        x =>
            x.grade === selectedStudentAtLatestPresence.grade &&
            x.groupName === selectedStudentAtLatestPresence.groupName
    );

    const totals = presencePerPeriod.reduce(
        (acc, crt) => {
            if (!crt.noCourse) acc.totalCourses += 1;
            if (crt.presence) acc.totalPresences += 1;
            return acc;
        },
        { totalPresences: 0, totalCourses: 0 }
    );
    if (totals.totalCourses !== 0) {
        totals.totalPresencesAsPercent = Math.round((totals.totalPresences * 100) / totals.totalCourses);
    }

    console.log(totals);

    const data = {
        // groupName: getGroupNameById(groupId),
        // allPresences: allPresences
        student: selectedStudentAtLatestPresence,
        presencePerStudent: presencePerPeriod,
        totals
    };
    res.render("matemaraton/presence-per-student", data);
};

const getPresencePerStudentsObjWithTotal = (presencePerGroups, totalCourses) => {
    const presencePerStudents = getPresencePerStudentsObj(presencePerGroups);

    // for each student, calculate totalPresences as percent (of the total # of courses)
    Object.keys(presencePerStudents).forEach(key => {
        presencePerStudents[key].totalPresencesAsPercent = Math.round(
            (presencePerStudents[key].totalPresences * 100) / totalCourses
        );
    });

    return presencePerStudents;
};

const getPresencePerStudentsObj = presencePerGroups => {
    return presencePerGroups.reduce((acc, crt) => {
        if (crt.students) {
            crt.students.forEach(student => {
                if (acc[student.id]) {
                    acc[student.id].totalPresences += 1;
                } else {
                    acc[student.id] = {
                        id: student.id,
                        shortName: student.shortName,
                        class: student.class,
                        totalPresences: 1
                    };
                }
            });
        }
        return acc;
    }, {});
};

const getTotalCourses = presencePerGroups => presencePerGroups.filter(x => !x.noCourse).reduce(acc => acc + 1, 0);

// sort student by 'totalPresences' (desc), then by 'shortName' (asc); https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
const sortByPresence = (a, b) =>
    a.totalPresences > b.totalPresences
        ? -1
        : a.totalPresences === b.totalPresences
        ? a.shortName > b.shortName
            ? 1
            : -1
        : 1;
