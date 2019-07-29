const studentService = require("../../shared/services/student.service");
const classService = require("../../shared/services/class.service");
const gradebookService = require("../../shared/services/gradebook.service");
// const lessonService = require("../services/lesson.service");
const studentsAndClassesService = require("../../shared/services/studentsAndClasses.service");

// const lessonService = require("../services/lesson.service");
// const matemaratonService = require("../services/matemaraton.service");
const arrayHelper = require("../../shared/helpers/array.helper");
// const timetableService = require("../services/timetable.service");
// const { PageNotFound } = require("../../shared/errors/all.errors");

// uncomment the associated route in order to import students
exports.import = async (req, res) => {
    const [studentsFromSiiir, classes] = await Promise.all([
        await studentService.getAllFromSiiir(),
        await classService.getAll()
    ]);

    const classesAsObject = arrayHelper.arrayToObject(classes, "name");

    const newStudents = studentsFromSiiir.map(x => {
        // const classFullName = x["COD FORMATIUNE"]; // 'Clasa a VIII-a A`, 'Clasa I A', 'Clasa pregatitoare A' etc
        const classType = x["TIP FORMATIUNE"]; // 'Clasa a VIII-a`, 'Clasa I', 'Clasa pregatitoare' etc
        const classLetter = x["COD FORMATIUNE"].slice(-1); // 'A', 'B' etc
        const classAndGrade = getClassAndGrade(classType, classLetter, classesAsObject);
        const firstName = capitlizeFirstLetter(x["PRENUME1"]);
        let allFirstNames = firstName;
        if (x["PRENUME2"]) allFirstNames = `${firstName} ${capitlizeFirstLetter(x["PRENUME2"])}`;
        if (x["PRENUME3"]) allFirstNames = `${allFirstNames} ${capitlizeFirstLetter(x["PRENUME3"])}`;
        return {
            cnp: x.CNP.toString(),
            firstName,
            allFirstNames,
            lastName: capitlizeFirstLetter(x["NUME"]),
            class: classAndGrade && classAndGrade.class,
            grade: classAndGrade && classAndGrade.grade
        };
    });

    studentService.insertMany(newStudents);
    // studentService.insertOne(newStudents[0]);
    // console.log(newStudents[0].class.id.toString());

    const data = {
        // studentsFromSiiir,
        // classes,
        newStudents,
        ctx: req.ctx
    };

    res.send(data);
};

exports.getStudent = async (req, res) => {
    const studentId = req.params.studentId;
    // const student = await studentService.getOneById(studentId);
    const academicYear = "201819";

    const [student, studentAndClass, lastGradebookItems] = await Promise.all([
        await studentService.getOneById(studentId),
        await studentsAndClassesService.getStudentAndClassByStudentIdAndYear(studentId, academicYear),
        await gradebookService.getGradebookItemsPerStudent(studentId, academicYear)
    ]);

    const currentClass = await classService.getOneById(studentAndClass.class.id);
    student.firstNameFirstChar = student.firstName.charAt(0);

    // const currentClassWithYear = classesPerStudent.find(x => x.academicYear === "201819");
    // const currentClass = (currentClassWithYear && currentClassWithYear.class) || "graduated";

    const lastAbsences = lastGradebookItems.filter(x => x.itemType === "absence");
    // const lastMarks = lastGradebookItems.filter(x => x.itemType !== "absence");
    const lastMarks = lastGradebookItems;

    const data = {
        student,
        // classesPerStudent,
        currentClass,
        lastMarks,
        lastAbsences
    };

    //res.send(data);
    res.render("student/student", data);
};

const getClassAndGrade = (classType, classLetter, classesAsObject) => {
    let cls = null;
    // const grade = null;
    if (classType === "Clasa a VIII-a") {
        cls = classesAsObject["8" + classLetter];
    } else if (classType === "Clasa a VII-a") {
        cls = classesAsObject["7" + classLetter];
    } else if (classType === "Clasa a VI-a") {
        cls = classesAsObject["6" + classLetter];
    } else if (classType === "Clasa a V-a") {
        cls = classesAsObject["5" + classLetter];
    } else if (classType === "Clasa a IV-a") {
        cls = classesAsObject["4" + classLetter];
    } else if (classType === "Clasa a III-a") {
        cls = classesAsObject["3" + classLetter];
    } else if (classType === "Clasa a II-a") {
        cls = classesAsObject["2" + classLetter];
    } else if (classType === "Clasa I") {
        cls = classesAsObject["1" + classLetter];
    } else if (classType === "Clasa pregătitoare") {
        cls = classesAsObject["0" + classLetter];
    }
    if (!cls) return null;
    return {
        class: { id: cls._id.toString(), name: cls.name }, // toString() -> convers from ObjectId to string
        grade: cls.grade
    };
};

const capitlizeFirstLetter = text =>
    text
        .toLowerCase()

        // ANA MARIA -> Ana Maria
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")

        // ANA-MARIA -> Ana-Maria
        .split("-")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join("-");
