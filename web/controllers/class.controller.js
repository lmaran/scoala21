const classService = require("../../shared/services/class.service");
const lessonService = require("../../shared/services/lesson.service");
const studentService = require("../../shared/services/student.service");
const personService = require("../../shared/services/person.service");
const studentsAndClassesService = require("../../shared/services/studentsAndClasses.service");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getAll = async (req, res) => {
    const classes = await classService.getAll();

    const classesByGradeAsObject = arrayHelper.groupBySubKey(classes, "grade", "name");

    const classesByGrade = Object.keys(classesByGradeAsObject)
        .map(key => {
            return {
                grade: key,
                classes: classesByGradeAsObject[key]
            };
        })
        .sort((a, b) => b.grade - a.grade); // sort by grade, desc

    const data = {
        classesByGrade,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/classes", data);
};

exports.getStudents = async (req, res) => {
    const classId = req.params.classId;

    const [cls, studentIdsPerClass] = await Promise.all([
        await classService.getOneById(classId),
        await studentsAndClassesService.getStudentsIdsPerClass(classId)
    ]);

    const students = await personService.getByIds(studentIdsPerClass);

    const data = {
        class: cls,
        students,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/class-students", data);
};

exports.getParents = async (req, res) => {
    const classId = req.params.classId;

    const [studentsIds, cls] = await Promise.all([
        // await studentService.getStudentsPerClass(classId),
        await studentsAndClassesService.getStudentsIdsPerClass(classId),
        await classService.getOneById(classId)
    ]);

    const students = await personService.getByIds(studentsIds);

    const data = {
        class: cls,
        students,
        studentsIds,
        // fullStudents,
        ctx: req.ctx
    };

    //res.send(data);
    res.render("class/class-parents", data);
};

exports.getTeachers = async (req, res) => {
    const classId = req.params.classId;

    const [lessons, cls] = await Promise.all([
        await lessonService.getLessonsForClass(classId),
        await classService.getOneById(classId)
    ]);

    // sort teachers by name
    lessons.sort((a, b) => {
        if (a.teacher.name > b.teacher.name) return 1;
        else if (a.teacher.name < b.teacher.name) return -1;
        else return 0;
    });

    const data = {
        class: cls,
        lessons,
        ctx: req.ctx
    };

    // res.send(lessons);
    res.render("class/class-teachers", data);
};

exports.getClass = async (req, res) => {
    const classId = req.params.classId;
    const cls = await classService.getOneById(classId);

    const data = {
        class: cls,
        ctx: req.ctx
    };

    //res.send(data);
    res.render("class/class", data);
};
