const studentService = require("../services/student.service");
const gradebookService = require("../services/gradebook.service");
const lessonService = require("../services/lesson.service");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getStudentCatalog = async (req, res) => {
    const studentId = req.params.studentId;
    // const student = await studentService.getOneById2(studentId);
    const academicYear = "201819";

    const [student, classesPerStudent, lastGradebookItems] = await Promise.all([
        await studentService.getOneById2(studentId),
        await studentService.getClassesPerStudent(studentId),
        await gradebookService.getLatestGradebookItemsPerStudent(studentId, academicYear)
    ]);

    student.firstNameFirstChar = student.firstName.charAt(0);

    const currentClassWithYear = classesPerStudent.find(x => x.academicYear === "201819");
    const currentClass = (currentClassWithYear && currentClassWithYear.class) || "graduated";

    const allLessons = await lessonService.getLessonsForClass(currentClass.id);

    // const allSubjects = allLessons.map(x => x.subject);
    const allSubjectsObj = allLessons.reduce((acc, crt) => {
        acc[crt.subject.id] = { subject: crt.subject };
        return acc;
    }, {});

    // const lastAbsences = lastGradebookItems.filter(x => x.itemType === "absence");
    // const lastMarks = lastGradebookItems;

    // const subjectsObj = {};
    // populate lastSubjectObj with items from catalog
    lastGradebookItems.forEach(x => {
        const subjectObj = allSubjectsObj[x.subject.id]; // shortcut
        if (subjectObj) {
            if (x.itemType === "absence") {
                if (!subjectObj["absences"]) {
                    subjectObj["absences"] = [];
                }
                subjectObj["absences"].push({
                    itemDate: x.itemDate,
                    itemIsExcused: x.itemIsExcused,
                    itemId: x._id.toString()
                });
            } else if (x.itemType === "mark") {
                if (!subjectObj["marks"]) {
                    subjectObj["marks"] = [];
                }
                // console.log(x);
                subjectObj["marks"].push({
                    itemDate: x.itemDate,
                    itemValue: x.itemValue,
                    itemId: x._id.toString() // toString() -> convers from ObjectId to string
                });
            } else if (x.itemType === "semestrialTestPaper") {
                subjectObj["semestrialTestPaper"] = {
                    itemValue: x.itemValue,
                    itemId: x._id.toString() // toString() -> convers from ObjectId to string
                };
            } else if (x.itemType === "semestrialAverage") {
                subjectObj["semestrialAverage"] = {
                    itemValue: x.itemValue,
                    itemId: x._id.toString() // toString() -> convers from ObjectId to string
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
        classesPerStudent,
        currentClass,
        // lastMarks,
        // lastAbsences,
        allSubjects,
        // allSubjectsObj,
        ctx: req.ctx,
        uiData: {
            academicYear: currentClassWithYear.academicYear,
            semester: 1,
            class: currentClassWithYear.class,
            student: newStudent,
            allSubjects
        }
    };

    // res.send(data);
    res.render("catalog/catalog", data);
};
