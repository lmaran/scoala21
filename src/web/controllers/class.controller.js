const classService = require("../../shared/services/class.service");
const lessonService = require("../../shared/services/lesson.service");
const timetableService = require("../../shared/services/timetable.service");
const studentService = require("../../shared/services/student.service");
const studentsAndClassesService = require("../../shared/services/studentsAndClasses.service");
const { PageNotFound } = require("../../shared/errors/all.errors");
const matemaratonService = require("../../matemaraton/services/matemaraton.service");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getAll = async (req, res) => {
    const classes = await classService.getAll();

    const classesByGradeAsObject = arrayHelper.groupBySubKey(classes, "grade", "name");

    const classesByGrade = Object.keys(classesByGradeAsObject)
        .map(key => {
            return {
                grade: key,
                classes: classesByGradeAsObject[key]
            };
        })
        .sort((a, b) => b.grade - a.grade); // sort by grade, desc

    const data = {
        classesByGrade,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/classes", data);
};

exports.getStudents = async (req, res) => {
    const classId = req.params.classId;

    const [cls, studentIdsPerClass] = await Promise.all([
        await classService.getOneById(classId),
        await studentsAndClassesService.getStudentsIdsPerClass(classId)
    ]);

    const students = await studentService.getStudentsByIds(studentIdsPerClass);

    const data = {
        class: cls,
        students,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/class-students", data);
};

exports.getParents = async (req, res) => {
    const classId = req.params.classId;

    const [studentsIds, cls] = await Promise.all([
        // await studentService.getStudentsPerClass(classId),
        await studentService.getStudentsIdsPerClass(classId),
        await classService.getOneById(classId)
    ]);

    const students = await studentService.getStudentsByIds(studentsIds);

    const data = {
        class: cls,
        students,
        studentsIds,
        // fullStudents,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/class-parents", data);
};

exports.getTeachers = async (req, res) => {
    const classId = req.params.classId;

    const [lessons, cls] = await Promise.all([
        await lessonService.getLessonsForClass(classId),
        await classService.getOneById(classId)
    ]);

    // sort teachers by name
    lessons.sort((a, b) => {
        if (a.teacher.name > b.teacher.name) return 1;
        else if (a.teacher.name < b.teacher.name) return -1;
        else return 0;
    });

    const data = {
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

    const lessonsAsObject = arrayHelper.arrayToObject(lessons, "_id");

    const timetableItemsAsObject = timetableItems.reduce((acc, crt) => {
        const crtLesson = lessonsAsObject[crt.lessonId];
        if (crtLesson) {
            const newItem = {
                day: crt.day,
                hour: crt.hour,
                lesson: {
                    subject: crtLesson.subject,
                    teacher: crtLesson.teacher
                },
                allWeeks: !crtLesson.week
            };

            if (crtLesson.week) {
                newItem.lesson.week = crtLesson.week;
            }

            if (acc[crt.day]) {
                acc[crt.day].push(newItem);
            } else {
                acc[crt.day] = [newItem];
            }
        }
        return acc;
    }, {});

    // if there are multiple lessons per hour (allWeeks=false) then group them in a single object
    // with property "lessons" instead of "lesson"
    Object.keys(timetableItemsAsObject).forEach(key => {
        timetableItemsAsObject[key] = timetableItemsAsObject[key].reduce((acc, crt) => {
            if (crt.allWeeks) {
                acc.push(crt);
            } else {
                const findTimeItem = acc.find(x => x.hour === crt.hour);
                const newLessonPerWeek = {
                    week: crt.lesson.week,
                    lesson: {
                        subject: crt.lesson.subject,
                        teacher: crt.lesson.teacher
                    }
                };
                if (findTimeItem) {
                    findTimeItem.lessonsPerWeek.push(newLessonPerWeek);
                    // findTimeItem.lessonsPerWeek = findTimeItem.lessonsPerWeek.sort(sortByWeekName);
                } else {
                    acc.push({
                        day: crt.day,
                        // dayNumber: crt.dayNumber,
                        hour: crt.hour,
                        lessonsPerWeek: [newLessonPerWeek],
                        allWeeks: crt.allWeeks // always false here
                    });
                }
            }
            return acc;
        }, []);
    });

    const allHours = [
        {
            id: "1",
            start: "08:00",
            end: "08:50"
        },
        {
            id: "2",
            start: "09:00",
            end: "09:50"
        },
        {
            id: "3",
            start: "10:00",
            end: "10:45"
        },
        {
            id: "4",
            start: "11:00",
            end: "11:50"
        },
        {
            id: "5",
            start: "12:00",
            end: "12:50"
        },
        {
            id: "6",
            start: "13:00",
            end: "13:50"
        }
    ];

    const allDays = ["Luni", "Marti", "Miercuri", "Joi", "Vineri"];
    const allWeeks = ["A", "B"];
    const lessonsPerDay = [];

    allDays.forEach(day => {
        const lessonsPerHour = timetableItemsAsObject[day];

        const newLessonsPerHour = [];
        allHours.forEach(hour => {
            const existingLessonPerHour = lessonsPerHour && lessonsPerHour.find(x => x.hour === hour.id);
            const newLessonPerHour = {
                hour: hour
            };
            if (existingLessonPerHour) {
                newLessonPerHour.allWeeks = existingLessonPerHour.allWeeks;
                if (existingLessonPerHour.allWeeks) {
                    newLessonPerHour.lesson = existingLessonPerHour.lesson;
                } else {
                    // multiple lessons per hour
                    const newLessonsPerWeek = [];
                    allWeeks.forEach(week => {
                        const existingLessonPerWeek = existingLessonPerHour.lessonsPerWeek.find(
                            x => x.week.shortName === week
                        );
                        const newLessonPerWeek = {
                            week: week
                        };
                        if (existingLessonPerWeek) {
                            newLessonPerWeek.lesson = existingLessonPerWeek.lesson;
                        }
                        newLessonsPerWeek.push(newLessonPerWeek);
                    });
                    newLessonPerHour.lessonsPerWeek = newLessonsPerWeek;
                }
            }

            newLessonsPerHour.push(newLessonPerHour);
        });

        lessonsPerDay.push({
            day: day,
            lessonsPerHour: newLessonsPerHour
        });
    });

    const data = {
        class: cls,
        lessonsPerDay,
        ctx: req.ctx
    };

    //res.send(data);
    res.render("class/class-timetable", data);
};

exports.getClass = async (req, res) => {
    const classId = req.params.classId;
    const cls = await classService.getOneById(classId);

    const data = {
        class: cls,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/class", data);
};
