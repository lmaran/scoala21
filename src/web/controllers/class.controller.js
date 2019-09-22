const classService = require("../../shared/services/class.service");
const lessonService = require("../../shared/services/lesson.service");
const personService = require("../../shared/services/person.service");
const arrayHelper = require("../../shared/helpers/array.helper");

exports.getAll = async (req, res) => {
    const academicYear = "201920";
    const classes = await classService.getClassesByAcademicYear(academicYear);

    // const classesByGradeAsObject = arrayHelper.groupBySubKey(classes, "grade", "name");
    const classesByGradeAsObject = arrayHelper.groupBy(classes, "grade");

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

    const cls = await classService.getOneById(classId);
    const students = await personService.getByIds(cls.members);

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

    const cls = await classService.getOneById(classId);
    const students = await personService.getByIds(cls.members);

    const data = {
        class: cls,
        students,
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
