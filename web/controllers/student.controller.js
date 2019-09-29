const personService = require("../../shared/services/person.service");
const classService = require("../../shared/services/class.service");

exports.getStudent = async (req, res) => {
    const studentId = req.params.studentId;
    const academicYear = "201920";

    const student = await personService.getOneById(studentId);
    const currentClass = await classService.getClassByStudentId(academicYear, studentId);

    student.firstNameFirstChar = student.firstName.charAt(0);

    const data = {
        student,
        currentClass
    };

    //res.send(data);
    res.render("student/student", data);
};
