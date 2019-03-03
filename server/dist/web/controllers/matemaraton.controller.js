const matemaratonService = require("../services/matemaraton.service");
const studentService = require("../services/student.service");
const { PageNotFound } = require("../../shared/errors/all.errors");
const dateTimeHelper = require("../../shared/helpers/date-time.helper");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getTrainingProgramForENSimulation = async (req, res) => {
    const data = {
        // ctx: req.ctx,
    };
    res.render("matemaraton/pregatire-simulare-en", data);
};

exports.getMatemaraton = async (req, res) => {
    const data = {
        // ctx: req.ctx,
    };
    res.render("matemaraton/matemaraton", data);
};

exports.getPresencePerGroup = async (req, res, next) => {
    // get edition (and its associated period)
    // edition = {period:'201819', edition:'2', ...}
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
        edition = await matemaratonService.getCurrentEdition();
    }

    if (!edition) {
        const err = new PageNotFound(`Pagina negasita2: ${req.method} ${req.url}`);
        return next(err);
    }

    const period = edition.period; // 201819

    // check group name
    const groupId = req.params.id;
    const routeParamWhitelist = ["8-avansati", "8-incepatori", "5-avansati"];
    if (!routeParamWhitelist.includes(groupId)) {
        const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
        return next(err);
    }

    const [grade, groupName] = groupId.split("-");

    const [presencePerGroups, students] = await Promise.all([
        await matemaratonService.getPresencePerGroup(period, grade, groupName),
        await matemaratonService.getStudentsPerGrade(period, grade)
    ]);

    const studentsObj = arrayHelper.arrayToObject(students, "_id");

    // enrich students with 'totalPresences'
    // calculate also 'totalCourses'
    let totalCourses = 0;
    presencePerGroups.forEach(presencePerWeek => {
        if (!presencePerWeek.noCourse) {
            totalCourses += 1;
            if (presencePerWeek.students) {
                presencePerWeek.students.forEach(studentId => {
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
            student.totalPresencesAsPercent = Math.round((student.totalPresences * 100) / totalCourses);
        });
    }

    presencePerGroups.forEach(presencePerWeek => {
        presencePerWeek.dateAsString = dateTimeHelper.getStringFromStringNoDay(presencePerWeek.date);
        if (presencePerWeek.students) {
            presencePerWeek.students = presencePerWeek.students
                .reduce((acc, studentId) => {
                    const student = studentsObj[studentId];
                    acc.push(student);
                    return acc;
                }, [])
                .sort(sortByPresence);
        }
    });

    // convert students: obj --> array
    const presencePerStudents = arrayHelper
        .objectToArray(studentsObj)
        .filter(x => x.totalPresences) // exclude students from other groups
        .sort(sortByPresence);

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

exports.getPresencePerStudent = async (req, res) => {
    // get edition (and its associated period)
    // edition = {period:'201819', edition:'2', ...}
    const editionName = req.params.edition; // "edition-2"
    const studentId = req.params.id;
    let edition = null;
    let student = null;
    if (editionName) {
        const editionSegments = editionName.split("-");
        if (editionSegments.length !== 2) {
            const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        } else {
            // edition = await matemaratonService.getSelectedEdition(editionSegments[1]);

            [edition, student] = await Promise.all([
                await matemaratonService.getSelectedEdition(editionSegments[1]),
                await studentService.getOneById(studentId)
            ]);
        }
    } else {
        // edition = await matemaratonService.getCurrentEdition();
        [edition, student] = await Promise.all([
            await matemaratonService.getCurrentEdition(),
            await studentService.getOneById(studentId)
        ]);
    }

    if (!edition || !student) {
        const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
        return next(err);
    }

    const period = edition.period; // 201819

    res.send(edition);

    // const studentId = req.params.id;
    // const period = "201819";

    // // const presencePerStudent = await matemaratonService.getPresencePerStudent(period, studentId);
    // let presencePerPeriod = await matemaratonService.getPresencePerPeriod(period);

    // let selectedStudentAtLatestPresence = null;

    // presencePerPeriod.forEach(line => {
    //     line.dateAsString = dateTimeHelper.getStringFromStringNoDay(line.date);
    //     if (line.students) {
    //         const studentFound = line.students.find(x => x.id === studentId);
    //         if (studentFound) {
    //             line.presence = true;

    //             // extract student info from its latest presence
    //             if (!selectedStudentAtLatestPresence) {
    //                 selectedStudentAtLatestPresence = studentFound;
    //                 selectedStudentAtLatestPresence.grade = line.grade;
    //                 selectedStudentAtLatestPresence.groupName = line.groupName;
    //             }
    //         }
    //     }
    //     line.students = null;
    // });

    // // ditch the grades and groups the student do not belong
    // presencePerPeriod = presencePerPeriod.filter(
    //     x =>
    //         x.grade === selectedStudentAtLatestPresence.grade &&
    //         x.groupName === selectedStudentAtLatestPresence.groupName
    // );

    // const totals = presencePerPeriod.reduce(
    //     (acc, crt) => {
    //         if (!crt.noCourse) acc.totalCourses += 1;
    //         if (crt.presence) acc.totalPresences += 1;
    //         return acc;
    //     },
    //     { totalPresences: 0, totalCourses: 0 }
    // );
    // if (totals.totalCourses !== 0) {
    //     totals.totalPresencesAsPercent = Math.round((totals.totalPresences * 100) / totals.totalCourses);
    // }

    // // console.log(totals);

    // const data = {
    //     student: selectedStudentAtLatestPresence,
    //     presencePerStudent: presencePerPeriod,
    //     totals
    // };
    // res.render("matemaraton/presence-per-student", data);
};

// sort student by 'totalPresences' (desc), then by 'shortName' (asc); https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
const sortByPresence = (a, b) =>
    a.totalPresences > b.totalPresences
        ? -1
        : a.totalPresences === b.totalPresences
        ? a.shortName > b.shortName
            ? 1
            : -1
        : 1;
