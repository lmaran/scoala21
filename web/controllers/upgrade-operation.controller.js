// const personService = require("../../shared/services/person.service");
const classService = require("../../shared/services/class.service");
// const gradebookService = require("../../gradebook/services/gradebook.service");

// const arrayHelper = require("../../shared/helpers/array.helper");
// const timetableService = require("../services/timetable.service");
// const { PageNotFound } = require("../../shared/errors/all.errors");
// const { ObjectID } = require("mongodb");

// uncomment the associated route in order to import students

// exports.promoteClasses = async (req, res) => {
//     const academicYearOld = "201819";
//     const academicYearNew = "201920";

//     const oldClasses = await classService.getClassesByAcademicYear(academicYearOld);

//     const newClasses = [];
//     oldClasses.forEach(cls => {
//         if (cls.grade !== "8") {
//             const newGradeAsString = (parseInt(cls.grade) + 1).toString();
//             newClasses.push({
//                 name: `${newGradeAsString}${cls.name.charAt(1)}`,
//                 grade: newGradeAsString,
//                 classTeacher: cls.classTeacher,
//                 academicYear: academicYearNew,
//                 members: cls.members
//             });
//         }
//     });

//     await classService.insertMany(newClasses);

//     const data = {
//         oldClasses,
//         newClasses
//     };
//     res.send(data);
// };

// exports.moveStudentsToClasses = async (req, res) => {
//     const [classes, studentsAndClasses] = await Promise.all([
//         await classService.getAll(),
//         await studentsAndClassesService.getAll()
//     ]);

//     const mongoOps = [];
//     classes.forEach(cls => {
//         const classId = cls._id;
//         const studentsAndClassesPerClass = studentsAndClasses.filter(x => x.class.id == classId);
//         cls.members = studentsAndClassesPerClass.map(x => x.student.id); // "_id" is an object
//         mongoOps.push({
//             updateOne: {
//                 filter: { _id: classId },
//                 update: { $set: { members: cls.members } }
//             }
//         });
//     });

//     await classService.bulkWrite(mongoOps);

//     const data = {
//         classes
//     };
//     res.send(data);
// };

// exports.moveStudentsToPersons = async (req, res) => {
//     const [students] = await Promise.all([await studentService.getAll()]);

//     const newPersons = students.map(t => {
//         return {
//             _id: new ObjectID(t._id),
//             isStudent: true,
//             isActive: true,
//             firstName: t.firstName,
//             lastName: t.lastName,
//             studentInfo: {
//                 parents: t.parents,
//                 shortFirstName: t.shortFirstName
//             }
//         };
//     });

//     // await personService.insertMany(newPersons);

//     res.send(newPersons);
// };

// exports.moveParentsToPersonsOld = async (req, res) => {
//     const [parents] = await Promise.all([await parentService.getAll()]);

//     const newPersons = parents.map(p => {
//         return {
//             _id: new ObjectID(p._id),
//             isParent: true,
//             isActive: true,
//             firstName: p.firstName,
//             lastName: p.lastName,
//             email: p.email,
//             parentInfo: {
//                 students: p.students
//             }
//         };
//     });

//     await personService.insertMany(newPersons);

//     res.send(newPersons);
// };

// exports.moveTeachersToPersonsOld = async (req, res) => {
//     const [teachers] = await Promise.all([await teacherService.getAll()]);

//     const newPersons = teachers.map(t => {
//         return {
//             _id: new ObjectID(t._id),
//             isTeacher: true,
//             isActive: true,
//             firstName: t.firstName,
//             lastName: t.lastName,
//             teacherInfo: {
//                 isFull: t.holder,
//                 degree: t.degree,
//                 area: t.area,
//                 subject: t.subject,
//                 isManager: t.isManager
//             }
//         };
//     });

//     await personService.insertMany(newPersons);

//     res.send(newPersons);
// };

// exports.importStudentsFromSiiir = async (req, res) => {
//     const [studentsFromSiiir, classes] = await Promise.all([
//         await studentService.getAllFromSiiir(),
//         await classService.getAll()
//     ]);

//     const classesAsObject = arrayHelper.arrayToObject(classes, "name");

//     const newStudents = studentsFromSiiir.map(x => {
//         // const classFullName = x["COD FORMATIUNE"]; // 'Clasa a VIII-a A`, 'Clasa I A', 'Clasa pregatitoare A' etc
//         const classType = x["TIP FORMATIUNE"]; // 'Clasa a VIII-a`, 'Clasa I', 'Clasa pregatitoare' etc
//         const classLetter = x["COD FORMATIUNE"].slice(-1); // 'A', 'B' etc
//         const classAndGrade = getClassAndGrade(classType, classLetter, classesAsObject);
//         const firstName = capitlizeFirstLetter(x["PRENUME1"]);
//         let allFirstNames = firstName;
//         if (x["PRENUME2"]) allFirstNames = `${firstName} ${capitlizeFirstLetter(x["PRENUME2"])}`;
//         if (x["PRENUME3"]) allFirstNames = `${allFirstNames} ${capitlizeFirstLetter(x["PRENUME3"])}`;
//         return {
//             cnp: x.CNP.toString(),
//             firstName,
//             allFirstNames,
//             lastName: capitlizeFirstLetter(x["NUME"]),
//             class: classAndGrade && classAndGrade.class,
//             grade: classAndGrade && classAndGrade.grade
//         };
//     });

//     studentService.insertMany(newStudents);
//     // studentService.insertOne(newStudents[0]);
//     // console.log(newStudents[0].class.id.toString());

//     const data = {
//         // studentsFromSiiir,
//         // classes,
//         newStudents,
//         ctx: req.ctx
//     };

//     res.send(data);
// };

// const getClassAndGrade = (classType, classLetter, classesAsObject) => {
//     let cls = null;
//     // const grade = null;
//     if (classType === "Clasa a VIII-a") {
//         cls = classesAsObject["8" + classLetter];
//     } else if (classType === "Clasa a VII-a") {
//         cls = classesAsObject["7" + classLetter];
//     } else if (classType === "Clasa a VI-a") {
//         cls = classesAsObject["6" + classLetter];
//     } else if (classType === "Clasa a V-a") {
//         cls = classesAsObject["5" + classLetter];
//     } else if (classType === "Clasa a IV-a") {
//         cls = classesAsObject["4" + classLetter];
//     } else if (classType === "Clasa a III-a") {
//         cls = classesAsObject["3" + classLetter];
//     } else if (classType === "Clasa a II-a") {
//         cls = classesAsObject["2" + classLetter];
//     } else if (classType === "Clasa I") {
//         cls = classesAsObject["1" + classLetter];
//     } else if (classType === "Clasa pregătitoare") {
//         cls = classesAsObject["0" + classLetter];
//     }
//     if (!cls) return null;
//     return {
//         class: { id: cls._id.toString(), name: cls.name }, // toString() -> convers from ObjectId to string
//         grade: cls.grade
//     };
// };

// const capitlizeFirstLetter = text =>
//     text
//         .toLowerCase()

//         // ANA MARIA -> Ana Maria
//         .split(" ")
//         .map(s => s.charAt(0).toUpperCase() + s.substring(1))
//         .join(" ")

//         // ANA-MARIA -> Ana-Maria
//         .split("-")
//         .map(s => s.charAt(0).toUpperCase() + s.substring(1))
//         .join("-");
