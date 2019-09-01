const personService = require("../../shared/services/person.service");
const classService = require("../../shared/services/class.service");
const gradebookService = require("../../gradebook/services/gradebook.service");
const studentsAndClassesService = require("../../shared/services/studentsAndClasses.service");

exports.getStudent = async (req, res) => {
    const studentId = req.params.studentId;
    // const student = await studentService.getOneById(studentId);
    const academicYear = "201819";

    const [student, studentAndClass, lastGradebookItems] = await Promise.all([
        await personService.getOneById(studentId),
        await studentsAndClassesService.getStudentAndClassByStudentIdAndYear(studentId, academicYear),
        await gradebookService.getGradebookItemsPerStudent(studentId, academicYear)
    ]);

    const currentClass = await classService.getOneById(studentAndClass.class.id);
    student.firstNameFirstChar = student.firstName.charAt(0);

    const lastAbsences = lastGradebookItems.filter(x => x.itemType === "absence");
    const lastMarks = lastGradebookItems;

    const data = {
        student,
        currentClass,
        lastMarks,
        lastAbsences
    };

    //res.send(data);
    res.render("student/student", data);
};
