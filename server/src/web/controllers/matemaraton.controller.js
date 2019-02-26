const matemaratonService = require("../services/matemaraton.service");
const { PageNotFound } = require("../../shared/errors/all.errors");
const dateTimeHelper = require("../../shared/helpers/date-time.helper");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getMatemaraton = async (req, res) => {
    const data = {
        // ctx: req.ctx,
    };
    res.render("matemaraton/matemaraton", data);
};

exports.getPresencePerGroup = async (req, res, next) => {
    // check group name
    const groupId = req.params.id;
    const routeParamWhitelist = ["8-avansati", "8-incepatori", "5-avansati"];

    if (!routeParamWhitelist.includes(groupId)) {
        const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
        return next(err);
    }

    // check edition
    const editionName = req.params.edition; // "edition-2"
    let edition = null;
    if (editionName) {
        const editionSegments = editionName.split("-");
        if (editionSegments.length !== 2) {
            const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        } else {
            edition = await matemaratonService.getSelectedEdition(editionSegments[1]);
        }
    } else {
        // get latest edition from  DB
        edition = await matemaratonService.getCurrentEdition();
    }

    if (!edition) {
        const err = new PageNotFound(`Pagina negasita2: ${req.method} ${req.url}`);
        return next(err);
    }

    const period = edition.period; // 201819

    const [grade, groupName] = groupId.split("-");

    // let presencePerGroups = await matemaratonService.getPresencePerGroup(period, grade, groupName);
    // const students = await matemaratonService.getStudentsPerGroup(period, grade, groupName);

    const [presencePerGroups, students] = await Promise.all([
        await matemaratonService.getPresencePerGroup(period, grade, groupName),
        await matemaratonService.getStudentsPerGrade(period, grade)
    ]);

    const studentsObj = arrayHelper.arrayToObject(students, "_id");

    // enrich students with total presences
    // populate also totalCourses
    let totalCourses = 0;
    presencePerGroups.forEach(presencePerWeek => {
        if (!presencePerWeek.noCourse) {
            totalCourses += 1;
            if (presencePerWeek.students2) {
                presencePerWeek.students2.forEach(studentId => {
                    const student = studentsObj[studentId];
                    if (student) {
                        if (!student.totalPresences) {
                            student.totalPresences = 1;
                        } else {
                            student.totalPresences += 1;
                        }
                    }
                });
            }
        }
    });

    // for each student, add totalPresencesAsPercent
    if (totalCourses !== 0) {
        Object.keys(studentsObj).forEach(studentId => {
            const student = studentsObj[studentId];
            // if (!student.totalPresences) student.totalPresences = 0;
            student.totalPresencesAsPercent = Math.round((student.totalPresences * 100) / totalCourses);
        });
    }

    // console.log(totalCourses);

    presencePerGroups.forEach(presencePerWeek => {
        presencePerWeek.dateAsString = dateTimeHelper.getStringFromStringNoDay(presencePerWeek.date);
        if (presencePerWeek.students2) {
            presencePerWeek.students = presencePerWeek.students2
                .reduce((acc, studentId) => {
                    const student = studentsObj[studentId];
                    // const selectedGrade = student.grades.find(x => x.period === period);
                    acc.push(student);
                    return acc;
                }, [])
                .sort(sortByPresence);
        }
    });

    const presencePerStudents = arrayHelper
        .objectToArray(studentsObj)
        .filter(x => x.totalPresences) // exclude students from other groups
        .sort(sortByPresence);

    // console.log(edition);
    // res.send(presencePerGroups);

    const data = {
        grade,
        groupName,
        presencePerGroups,
        presencePerStudents,
        totalCourses,
        totalStudents: presencePerStudents.length
    };
    res.render("matemaraton/presence-per-group", data);
};

exports.getPresencePerGroup2 = async (req, res, next) => {
    const groupId = req.params.id;
    const routeParamWhitelist = ["8-avansati", "8-incepatori", "5-avansati"];

    if (!routeParamWhitelist.includes(groupId)) {
        const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
        return next(err);
    }

    const [grade, groupName] = groupId.split("-");

    const period = "201819";
    const presencePerGroups = await matemaratonService.getPresencePerGroup(period, grade, groupName);

    const totalCourses = getTotalCourses(presencePerGroups);

    const presencePerStudentsObj = getPresencePerStudentsObjWithTotal(presencePerGroups, totalCourses);

    // console.log(presencePerStudentsObj);

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

    // sorted by mongo
    // presencePerGroups = presencePerGroups.sort((a, b) => (a.date > b.date ? -1 : 1)); // sort by date, desc

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

    // console.log(totals);

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
