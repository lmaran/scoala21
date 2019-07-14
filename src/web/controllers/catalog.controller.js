// const studentService = require("../services/student.service");
const gradebookService = require("../services/gradebook.service");
const lessonService = require("../services/lesson.service");
const arrayHelper = require("../../shared/helpers/array.helper");
const studentsAndClassesService = require("../services/studentsAndClasses.service");
// const classService = require("../services/class.service");

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

    const allLessons = await lessonService.getLessonsForClass(class2.id);

    const subjectsObj = allLessons.reduce((acc, crt) => {
        acc[crt.subject.id] = { id: crt.subject.id, name: crt.subject.name };
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
                    date: x.date,
                    isExcused: x.isExcused,
                    id: x._id.toString()
                });
            } else if (x.type === "mark") {
                if (!subjectObj["marks"]) {
                    subjectObj["marks"] = [];
                }
                subjectObj["marks"].push({
                    date: x.date,
                    value: x.value,
                    id: x._id.toString() // toString() -> converts from ObjectId to string
                });
            } else if (x.type === "semestrialTestPaper") {
                subjectObj["semestrialTestPaper"] = {
                    value: x.value,
                    id: x._id.toString() // toString() -> converts from ObjectId to string
                };
            } else if (x.type === "semestrialAverage") {
                subjectObj["semestrialAverage"] = {
                    value: x.value,
                    id: x._id.toString() // toString() -> converts from ObjectId to string
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
            // subjects: subjects.reduce((acc, crt) => {
            //     if (crt.marks) {
            //         crt.marks = arrayToObject(crt.marks, "id");
            //     }
            //     if (crt.absences) {
            //         crt.absences = arrayToObject(crt.absences, "id");
            //     }
            //     acc[crt.id] = crt;
            //     return acc;
            // }, {})
        }
    };

    //res.send(data);
    res.render("catalog/catalog", data);
};
