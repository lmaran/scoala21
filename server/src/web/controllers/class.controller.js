const classService = require("../services/class.service");
const lessonService = require("../services/lesson.service");
const timetableService = require("../services/timetable.service");
const { PageNotFound } = require("../../shared/errors/all.errors");
const matemaratonService = require("../services/matemaraton.service");


exports.getAll = async (req, res) => {
    const classes = await classService.getAll();

    // tmpGrades = {
    //      "5c88123e5926db0d231fa314": {id: "5c88123e5926db0d231fa314", name: "5"},
    // etc }
    const tmpGrades = {};

    const classesByGradeAsObject = {};
    classes.forEach(cls => {
        const grade = cls.grade;
        if (grade) {
            if (classesByGradeAsObject[grade.id]) {
                classesByGradeAsObject[grade.id].push(cls);
            } else {
                classesByGradeAsObject[grade.id] = [cls];
                tmpGrades[grade.id] = grade; // used later to get details about a specific grade
            }
        }
    });

    // classesByGrade: [
    //      { grade: {"id": "5c88123e5926db0d231fa314", name: "5"}, classes:[] },
    // etc ]
    const classesByGrade = Object.keys(classesByGradeAsObject).map(key => {
        return {
            grade: tmpGrades[key],
            classes: classesByGradeAsObject[key]
        };
    });

    const data = {
        // classesByGrade,
        classesByGrade,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/classes", data);
};

exports.getStudents = async (req, res) => {
    // const classId = req.params.classId;

    // const [lessons, cls] = await Promise.all([
    //     await lessonService.getLessonsForClass(classId),
    //     await classService.getOneById(classId)
    // ]);

    const data = {
        // classesByGrade,
        // class: cls,
        // lessons,
        ctx: req.ctx
    };

    // res.send(lessons);
    res.render("class/class-students", data);
};

exports.getTeachers = async (req, res) => {
    const classId = req.params.classId;

    const [lessons, cls] = await Promise.all([
        await lessonService.getLessonsForClass(classId),
        await classService.getOneById(classId)
    ]);

    const data = {
        // classesByGrade,
        class: cls,
        lessons,
        ctx: req.ctx
    };

    // res.send(lessons);
    res.render("class/class-teachers", data);
};

exports.getTimetable = async (req, res, next) => {
    const classId = req.params.classId;

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

    const academicYear = edition.period; // 201819

    const activeTimetable = await timetableService.getActiveTimetableForAcademicYear(academicYear);
    const timetableId = activeTimetable._id.toString(); // "_id" is an object

    const [lessons, cls, timetableItems] = await Promise.all([
        await lessonService.getLessonsForClass(classId),
        await classService.getOneById(classId),
        await timetableService.getTimetableItemsForClass(timetableId, classId)
    ]);

    const data = {
        lessons,
        class: cls,
        timetableItems,
        ctx: req.ctx
    };

    res.send(data);
    //res.render("class/class-timetable", data);
};

exports.getClass = async (req, res) => {
    const classId = req.params.classId;
    // const edition = await matemaratonService.getCurrentEdition();

    // const [teacher, lessons] = await Promise.all([
    //     await teacherService.getOneById(teacherId),
    //     await lessonService.getLessonsForTeacher(teacherId, edition.period)
    // ]);

    // const uniqueClassesAsObject = lessons.reduce((acc, crt) => {
    //     if (crt.class) {
    //         acc[crt.class.id] = crt.class;
    //     }
    //     return acc;
    // }, {});

    // const uniqueClasses = arrayHelper.objectToArray(uniqueClassesAsObject);

    const cls = await classService.getOneById(classId);

    const data = {
        // uniqueClasses,
        // teacher,
        // lessons,
        class: cls,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/class", data);
};

// item in DB (sample):
// {
//     "_id" : ObjectId("5c880fb65926db0d231fa30b"),
//     "name" : "5A-demo",
//     "shortName" : "5A-demo",
//     "grade" : {
//         "id" : "5c88123e5926db0d231fa314",
//         "name" : "5"
//     },
//     "homeRoom" : {
//         "id" : "123",
//         "name" : "asd"
//     },
//     "classTeacher" : {
//         "id" : "123",
//         "name" : "ss"
//     },
//     "divisions" : [
//         [
//             {
//                 "isEntireClass" : true,
//                 "name" : "Intreaga clasa",
//                 "nrOfStudents" : 20.0
//             }
//         ],
//         [
//             {
//                 "name" : "Mate-Avansati",
//                 "nrOfStudents" : 5.0
//             },
//             {
//                 "name" : "Mate-Incepatori",
//                 "nrOfStudents" : 8.0
//             }
//         ]
//     ]
// }
