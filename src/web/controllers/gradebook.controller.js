const gradebookService = require("../services/gradebook.service");
const dateTimeHelper = require("../../shared/helpers/date-time.helper");
const numberHelper = require("../../shared/helpers/number.helper");
const lessonService = require("../services/lesson.service");
const arrayHelper = require("../../shared/helpers/array.helper");
const studentsAndClassesService = require("../services/studentsAndClasses.service");

exports.editStudentCatalog = async (req, res) => {
    const studentId = req.params.studentId;

    const academicYear = "201819";
    const semester = "1";

    const [studentAndClass, gradebookItems] = await Promise.all([
        await studentsAndClassesService.getStudentAndClassByStudentIdAndYear(studentId, academicYear),
        await gradebookService.getGradebookItemsPerStudent(studentId, academicYear)
    ]);

    const student = studentAndClass.student;
    const class2 = studentAndClass.class;

    const lessonsForClass = await lessonService.getLessonsForClass(class2.id);

    const subjectsWithMandatorySemestrialTestPaper = lessonsForClass
        .filter(x => x.hasMandatorySemestrialTestPaper)
        .map(x => x.subject);

    // merge the 2 lists of subjects with semestrial test paper (class and student level)
    const subjectsWithSemestrialTestPaper = [
        ...(subjectsWithMandatorySemestrialTestPaper || []),
        ...(studentAndClass.semestrialTestPaperStudentsChoice || [])
    ];

    const subjectsWithSemestrialTestPaperObj = arrayHelper.arrayToObject(subjectsWithSemestrialTestPaper, "id");

    const subjectsObj = lessonsForClass.reduce((acc, crt) => {
        const hasSemestrialTestPaper = !!subjectsWithSemestrialTestPaperObj[crt.subject.id];
        acc[crt.subject.id] = {
            id: crt.subject.id,
            name: crt.isEducationalClass ? "Purtare" : crt.subject.name,
            ...(crt.isEducationalClass && { isEducationalClass: true }), // add isEducationalClass property (with value = true) only if crt.isEducationalClass = true -->  https://stackoverflow.com/a/40560953
            ...(hasSemestrialTestPaper && { hasSemestrialTestPaper: true }) // add hasSemestrialTestPaper property (with value = true) only if hasSemestrialTestPaper = true -->  https://stackoverflow.com/a/40560953
        };
        return acc;
    }, {});

    // populate subjectObj with items from catalog
    gradebookItems.forEach(x => {
        const subjectObj = subjectsObj[x.subject.id]; // shortcut
        if (subjectObj) {
            if (x.type === "absence") {
                if (!subjectObj["absences"]) {
                    subjectObj["absences"] = [];
                }
                subjectObj["absences"].push({
                    id: x._id.toString(), // toString() -> converts from ObjectId to string
                    date: x.date, // 2019-03-04
                    friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
                    isExcused: x.isExcused
                });
            } else if (x.type === "mark") {
                if (!subjectObj["marks"]) {
                    subjectObj["marks"] = [];
                }
                subjectObj["marks"].push({
                    id: x._id.toString(),
                    date: x.date,
                    friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
                    value: x.value
                });
            } else if (x.type === "semestrialTestPaper") {
                subjectObj["semestrialTestPaper"] = {
                    id: x._id.toString(),
                    value: x.value
                };
            } else if (x.type === "semestrialAverage") {
                subjectObj["semestrialAverage"] = {
                    id: x._id.toString(),
                    value: x.value, // 10
                    valueAsText: numberHelper.getValueAsText(x.value) // "zece"
                };
            }
        }
    });

    const subjects = arrayHelper.objectToArray(subjectsObj);

    const data = {
        student,
        class: class2,
        subjects,
        studentFirstNameFirstChar: student.firstName.charAt(0),
        // ctx: req.ctx,
        uiState: {
            academicYear,
            semester,
            student,
            class: class2,
            subjectsObj
        }
    };

    // res.send(data);
    res.render("gradebook/gradebook-edit", data);
};

exports.viewStudentCatalog = async (req, res) => {
    const studentId = req.params.studentId;

    const academicYear = "201819";
    const semester = "1";

    const [studentAndClass, gradebookItems] = await Promise.all([
        await studentsAndClassesService.getStudentAndClassByStudentIdAndYear(studentId, academicYear),
        await gradebookService.getGradebookItemsPerStudent(studentId, academicYear)
    ]);

    const student = studentAndClass.student;
    const class2 = studentAndClass.class;

    const lessonsForClass = await lessonService.getLessonsForClass(class2.id);

    // const subjectsWithMandatorySemestrialTestPaper = lessonsForClass
    //     .filter(x => x.hasMandatorySemestrialTestPaper)
    //     .map(x => x.subject);

    // // merge the 2 lists of subjects with semestrial test paper (class and student level)
    // const subjectsWithSemestrialTestPaper = [
    //     ...(subjectsWithMandatorySemestrialTestPaper || []),
    //     ...(studentAndClass.semestrialTestPaperStudentsChoice || [])
    // ];

    // const subjectsWithSemestrialTestPaperObj = arrayHelper.arrayToObject(subjectsWithSemestrialTestPaper, "id");

    const subjectsObj = lessonsForClass.reduce((acc, crt) => {
        // const hasSemestrialTestPaper = !!subjectsWithSemestrialTestPaperObj[crt.subject.id];
        acc[crt.subject.id] = {
            id: crt.subject.id,
            name: crt.isEducationalClass ? "Purtare" : crt.subject.name,
            ...(crt.isEducationalClass && { isEducationalClass: true }) // add isEducationalClass property (with value = true) only if crt.isEducationalClass = true -->  https://stackoverflow.com/a/40560953
            // ...(hasSemestrialTestPaper && { hasSemestrialTestPaper: true }) // add hasSemestrialTestPaper property (with value = true) only if hasSemestrialTestPaper = true -->  https://stackoverflow.com/a/40560953
        };
        return acc;
    }, {});

    // populate subjectObj with items from catalog
    gradebookItems.forEach(x => {
        const subjectObj = subjectsObj[x.subject.id]; // shortcut
        if (subjectObj) {
            if (x.type === "absence") {
                if (!subjectObj["absences"]) {
                    subjectObj["absences"] = [];
                }
                subjectObj["absences"].push({
                    id: x._id.toString(), // toString() -> converts from ObjectId to string
                    date: x.date, // 2019-03-04
                    friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
                    isExcused: x.isExcused
                });
            } else if (x.type === "mark") {
                if (!subjectObj["marks"]) {
                    subjectObj["marks"] = [];
                }
                subjectObj["marks"].push({
                    id: x._id.toString(),
                    date: x.date,
                    friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
                    value: x.value
                });
            } else if (x.type === "semestrialTestPaper") {
                subjectObj["semestrialTestPaper"] = {
                    id: x._id.toString(),
                    value: x.value
                };
            } else if (x.type === "semestrialAverage") {
                subjectObj["semestrialAverage"] = {
                    id: x._id.toString(),
                    value: x.value, // 10
                    valueAsText: numberHelper.getValueAsText(x.value) // "zece"
                };
            }
        }
    });

    const subjects = arrayHelper.objectToArray(subjectsObj);

    const data = {
        student,
        class: class2,
        subjects,
        studentFirstNameFirstChar: student.firstName.charAt(0),
        // ctx: req.ctx,
        uiState: {
            academicYear,
            semester,
            student,
            class: class2,
            subjectsObj
        }
    };

    // res.send(data);
    res.render("gradebook/gradebook-view", data);
};

exports.viewRecentStudentCatalog = async (req, res) => {
    const studentId = req.params.studentId;

    const academicYear = "201819";
    const semester = "1";

    const [studentAndClass, gradebookItems] = await Promise.all([
        await studentsAndClassesService.getStudentAndClassByStudentIdAndYear(studentId, academicYear),
        await gradebookService.getGradebookItemsPerStudent(studentId, academicYear)
    ]);

    const student = studentAndClass.student;
    const class2 = studentAndClass.class;

    const lessonsForClass = await lessonService.getLessonsForClass(class2.id);

    // const subjectsWithMandatorySemestrialTestPaper = lessonsForClass
    //     .filter(x => x.hasMandatorySemestrialTestPaper)
    //     .map(x => x.subject);

    // // merge the 2 lists of subjects with semestrial test paper (class and student level)
    // const subjectsWithSemestrialTestPaper = [
    //     ...(subjectsWithMandatorySemestrialTestPaper || []),
    //     ...(studentAndClass.semestrialTestPaperStudentsChoice || [])
    // ];

    // const subjectsWithSemestrialTestPaperObj = arrayHelper.arrayToObject(subjectsWithSemestrialTestPaper, "id");

    const subjectsObj = lessonsForClass.reduce((acc, crt) => {
        // const hasSemestrialTestPaper = !!subjectsWithSemestrialTestPaperObj[crt.subject.id];
        acc[crt.subject.id] = {
            id: crt.subject.id,
            name: crt.isEducationalClass ? "Purtare" : crt.subject.name,
            ...(crt.isEducationalClass && { isEducationalClass: true }) // add isEducationalClass property (with value = true) only if crt.isEducationalClass = true -->  https://stackoverflow.com/a/40560953
            // ...(hasSemestrialTestPaper && { hasSemestrialTestPaper: true }) // add hasSemestrialTestPaper property (with value = true) only if hasSemestrialTestPaper = true -->  https://stackoverflow.com/a/40560953
        };
        return acc;
    }, {});

    // populate subjectObj with items from catalog
    gradebookItems.forEach(x => {
        const subjectObj = subjectsObj[x.subject.id]; // shortcut
        if (subjectObj) {
            if (x.type === "absence") {
                if (!subjectObj["absences"]) {
                    subjectObj["absences"] = [];
                }
                subjectObj["absences"].push({
                    id: x._id.toString(), // toString() -> converts from ObjectId to string
                    date: x.date, // 2019-03-04
                    friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
                    isExcused: x.isExcused
                });
            } else if (x.type === "mark") {
                if (!subjectObj["marks"]) {
                    subjectObj["marks"] = [];
                }
                subjectObj["marks"].push({
                    id: x._id.toString(),
                    date: x.date,
                    friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
                    value: x.value
                });
            } else if (x.type === "semestrialTestPaper") {
                subjectObj["semestrialTestPaper"] = {
                    id: x._id.toString(),
                    value: x.value
                };
            } else if (x.type === "semestrialAverage") {
                subjectObj["semestrialAverage"] = {
                    id: x._id.toString(),
                    value: x.value, // 10
                    valueAsText: numberHelper.getValueAsText(x.value) // "zece"
                };
            }
        }
    });

    const subjects = arrayHelper.objectToArray(subjectsObj);

    const data2 = {
        student,
        class: class2,
        subjects,
        studentFirstNameFirstChar: student.firstName.charAt(0),
        // ctx: req.ctx,
        uiState: {
            academicYear,
            semester,
            student,
            class: class2,
            subjectsObj
        }
    };

    gradebookItems.forEach(
        x => (x.friendlyDate = x.date && dateTimeHelper.getMonthAndDayFomString(x.date)) // 04-Mar);
    );

    const absences = gradebookItems.filter(x => x.type === "absence");
    const marks = gradebookItems.filter(x => x.type === "mark");
    const semestrialTestPapers = gradebookItems.filter(x => x.type === "semestrialTestPaper");
    const semestrialAverages = gradebookItems.filter(x => x.type === "semestrialAverage");

    const data = {
        student,
        class: class2,
        gradebookItems: {
            absences,
            marks,
            semestrialTestPapers,
            semestrialAverages
        },
        studentFirstNameFirstChar: student.firstName.charAt(0)
        // ctx: req.ctx,
    };

    //res.send(data);
    res.render("gradebook/gradebook-view-recent", data);
};

exports.createGradebookItem = async (req, res) => {
    const gradebookItem = req.body;

    // console.log(gradebookItem);
    gradebookItem.createdOn = new Date();

    const response = await gradebookService.insertOne(gradebookItem);
    const createdItem = response.ops[0];
    const createdItemWithRelevantFields = {
        id: createdItem._id,
        value: createdItem.value
    };

    if (createdItem.date) {
        createdItemWithRelevantFields.date = createdItem.date; // 2019-03-04
        createdItemWithRelevantFields.friendlyDate = dateTimeHelper.getMonthAndDayFomString(createdItem.date); // 04-Mar
    }

    if (createdItem.type === "semestrialAverage") {
        createdItemWithRelevantFields.valueAsText = numberHelper.getValueAsText(createdItem.value); // "zece"
    }

    res.status(201).json(createdItemWithRelevantFields);
};

exports.createAbsences = async (req, res) => {
    const absencesObj = req.body;
    const absences = absencesObj.absences.reduce((acc, crt) => {
        acc.push({
            academicYear: absencesObj.academicYear,
            semester: absencesObj.semester,
            class: absencesObj.class,
            student: absencesObj.student,
            subject: absencesObj.subject,
            type: crt.type,
            date: crt.date,
            createdOn: new Date(),
            ...(crt.isExcused && { isExcused: true }) // add isExcused property (with value = true) only if crt.isExcused = true -->  https://stackoverflow.com/a/40560953
        });
        return acc;
    }, []);

    const response = await gradebookService.insertMany(absences);
    const createdAbsences = response.ops;
    const createdAbsencesWithRelevantFields = createdAbsences.map(x => ({
        id: x._id,
        date: x.date, // 2019-03-04
        friendlyDate: dateTimeHelper.getMonthAndDayFomString(x.date), // 04-Mar
        isExcused: x.isExcused
    }));
    res.status(201).json(createdAbsencesWithRelevantFields);
};

exports.deleteGradebookItem = async (req, res) => {
    const gradebookItemId = req.params.id;
    await gradebookService.deleteOneById(gradebookItemId);
    // res.send("ok");
    res.status(204).send(); // or res.sendStatus(204)
};

exports.excuseAbsence = async (req, res) => {
    const absenceId = req.params.id;
    await gradebookService.updateOneSetFields(absenceId, { isExcused: true });
    // console.log("response:");
    // console.log(response);
    // "200 ok" for successful PUT. No response body needed
    res.status(200).send(); // or res.sendStatus(200)

    // TODO: treat also other response codes: https://stackoverflow.com/a/827045
    // "409 Conflict" for a PUT that is unsuccessful due to a 3rd-party modification, with a list of differences
    // between the attempted update and the current resource in the response body

    // "400 Bad Request" for an unsuccessful PUT, with text in the response body that explains why the PUT failed
};
