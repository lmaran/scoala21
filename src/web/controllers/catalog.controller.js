const gradebookService = require("../services/gradebook.service");
const lessonService = require("../services/lesson.service");
const arrayHelper = require("../../shared/helpers/array.helper");
const studentsAndClassesService = require("../services/studentsAndClasses.service");
const dateTimeHelper = require("../../shared/helpers/date-time.helper");
const numberHelper = require("../../shared/helpers/number.helper");

exports.getStudentCatalog = async (req, res) => {
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
    res.render("catalog/catalog", data);
};
