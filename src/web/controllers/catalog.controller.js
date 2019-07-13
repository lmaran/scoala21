const studentService = require("../services/student.service");
const gradebookService = require("../services/gradebook.service");
const lessonService = require("../services/lesson.service");
const arrayHelper = require("../../shared/helpers/array.helper");
const studentsAndClassesService = require("../services/studentsAndClasses.service");
const classService = require("../services/class.service");

exports.getStudentCatalog = async (req, res) => {
    const studentId = req.params.studentId;
    // const student = await studentService.getOneById2(studentId);
    const academicYear = "201819";

    const [student, currentClassId, lastGradebookItems] = await Promise.all([
        await studentService.getOneById(studentId),
        await studentsAndClassesService.getCurrentClassIdByStudentAndYear(studentId, academicYear),
        await gradebookService.getLatestGradebookItemsPerStudent(studentId, academicYear)
    ]);

    const currentClass = await classService.getOneById(currentClassId);
    student.firstNameFirstChar = student.firstName.charAt(0);

    const allLessons = await lessonService.getLessonsForClass(currentClass._id);

    const allSubjectsObj = allLessons.reduce((acc, crt) => {
        acc[crt.subject._id] = { subject: crt.subject };
        return acc;
    }, {});

    // populate lastSubjectObj with items from catalog
    lastGradebookItems.forEach(x => {
        const subjectObj = allSubjectsObj[x.subject._id]; // shortcut
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

    const allSubjects = arrayHelper.objectToArray(allSubjectsObj);

    const newStudent = {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName
    };

    const data = {
        student,
        currentClass,
        allSubjects,
        ctx: req.ctx,
        uiData: {
            academicYear,
            semester: 1,
            class: currentClass,
            student: newStudent,
            allSubjects
        }
    };

    // res.send(data);
    res.render("catalog/catalog", data);
};
