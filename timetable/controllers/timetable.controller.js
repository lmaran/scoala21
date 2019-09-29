const classService = require("../../shared/services/class.service");
const personService = require("../../shared/services/person.service");
const lessonService = require("../../shared/services/lesson.service");
const timetableService = require("../../shared/services/timetable.service");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getTimetableForClass = async (req, res) => {
    const classId = req.params.classId;

    // // get edition (and its associated period)
    // // edition = {period:'201819', edition:'2', ...}
    // const editionName = req.params.edition; // "edition-2"
    // let edition = null;
    // if (editionName) {
    //     const editionSegments = editionName.split("-");
    //     if (editionSegments.length !== 2) {
    //         const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
    //         return next(err);
    //     } else {
    //         edition = await matemaratonService.getSelectedEdition(editionSegments[1]);
    //     }
    // } else {
    //     edition = await matemaratonService.getCurrentEdition();
    // }

    // if (!edition) {
    //     const err = new PageNotFound(`Pagina negasita2: ${req.method} ${req.url}`);
    //     return next(err);
    // }

    // const academicYear = edition.period; // 201819
    const academicYear = "201920";

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
    res.render("timetable-class", data);
};

exports.getTimetableForTeacher = async (req, res) => {
    const teacherId = req.params.teacherId;

    // // get edition (and its associated period)
    // // edition = {period:'201819', edition:'2', ...}
    // const editionName = req.params.edition; // "edition-2"
    // let edition = null;
    // if (editionName) {
    //     const editionSegments = editionName.split("-");
    //     if (editionSegments.length !== 2) {
    //         const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
    //         return next(err);
    //     } else {
    //         edition = await matemaratonService.getSelectedEdition(editionSegments[1]);
    //     }
    // } else {
    //     edition = await matemaratonService.getCurrentEdition();
    // }

    // if (!edition) {
    //     const err = new PageNotFound(`Pagina negasita2: ${req.method} ${req.url}`);
    //     return next(err);
    // }

    // const academicYear = edition.period; // 201819
    const academicYear = "201920";

    const activeTimetable = await timetableService.getActiveTimetableForAcademicYear(academicYear);
    const timetableId = activeTimetable._id.toString(); // "_id" is an object

    const [lessons, teacher, timetableItems] = await Promise.all([
        await lessonService.getLessonsForTeacher(teacherId, academicYear),
        await personService.getOneById(teacherId),
        await timetableService.getTimetableItems(timetableId)
    ]);

    teacher.firstNameFirstChar = teacher.firstName.charAt(0);

    const lessonsAsObject = arrayHelper.arrayToObject(lessons.filter(x => x.teacher.id === teacherId), "_id");

    const timetableItemsAsObject = timetableItems.reduce((acc, crt) => {
        const crtLesson = lessonsAsObject[crt.lessonId];
        if (crtLesson) {
            const newItem = {
                day: crt.day,
                hour: crt.hour,
                lesson: {
                    subject: crtLesson.subject,
                    teacher: crtLesson.teacher,
                    class: crtLesson.class
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
                        teacher: crt.lesson.teacher,
                        class: crt.lesson.class
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
            } else {
                newLessonPerHour.noLessonsPerHour = true;
            }

            newLessonsPerHour.push(newLessonPerHour);
        });

        const lessonPerDay = {
            day: day,
            lessonsPerHour: newLessonsPerHour
        };

        const lessonsExist = newLessonsPerHour.some(x => !x.noLessonsPerHour);
        if (!lessonsExist) {
            lessonPerDay.noLessonsPerDay = true;
        }

        lessonsPerDay.push(lessonPerDay);
    });

    const data = {
        teacher,
        lessonsPerDay,
        // lessonsAsObject,
        // timetableItemsAsObject,
        ctx: req.ctx
    };

    //res.send(data);
    res.render("timetable-teacher", data);
};
