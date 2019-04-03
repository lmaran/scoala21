const studentService = require("../services/student.service");
const classService = require("../services/class.service");
// const lessonService = require("../services/lesson.service");
const matemaratonService = require("../services/matemaraton.service");
const arrayHelper = require("../../shared/helpers/array.helper");
// const timetableService = require("../services/timetable.service");
const { PageNotFound } = require("../../shared/errors/all.errors");

exports.import = async (req, res, next) => {
    // get edition (and its associated period)
    // edition = {period:'201819', edition:'2', ...}
    const editionName = req.params.edition; // "edition-2"
    let edition = null;
    if (editionName) {
        const editionSegments = editionName.split("-");
        if (editionSegments.length !== 2) {
            const err = new PageNotFound(`Pagina negasita: ${req.method} ${req.url}`);
            return next(err);
        } else {
            edition = await matemaratonService.getSelectedEdition(editionSegments[1]);
        }
    } else {
        edition = await matemaratonService.getCurrentEdition();
    }

    if (!edition) {
        const err = new PageNotFound(`Pagina negasita2: ${req.method} ${req.url}`);
        return next(err);
    }

    const academicYear = edition.period; // 201819

    // const studentsFromSiiir = await studentService.getAllFromSiiir();

    const [studentsFromSiiir, classes] = await Promise.all([
        await studentService.getAllFromSiiir(),
        await await classService.getAll()
    ]);

    const classesAsObject = arrayHelper.arrayToObject(classes, "name");

    const newStudents = studentsFromSiiir.map(x => {
        const classAndGrade = getClassAndGrade(x.Formațiune, classesAsObject);
        return {
            firstName: capitlizeFirstLetter(x.Prenume),
            lastName: capitlizeFirstLetter(x.Nume),
            cnp: x.CNP.toString(),
            class: classAndGrade && classAndGrade.class,
            grade: classAndGrade && classAndGrade.grade
        };
    });

    const data = {
        studentsFromSiiir,
        // classes,
        newStudents,
        // classesAsObject,
        ctx: req.ctx
    };

    res.send(data);
};

const getClassAndGrade = (formatiune, classesAsObject) => {
    let cls = null;
    // const grade = null;
    if (formatiune && formatiune.startsWith("Clasa a VIII-a")) {
        const lastChar = formatiune.slice(-1);
        cls = classesAsObject["8" + lastChar];
    } else if (formatiune && formatiune.startsWith("Clasa a VII-a")) {
        const lastChar = formatiune.slice(-1);
        cls = classesAsObject["7" + lastChar];
    } else if (formatiune && formatiune.startsWith("Clasa a VI-a")) {
        const lastChar = formatiune.slice(-1);
        cls = classesAsObject["6" + lastChar];
    } else if (formatiune && formatiune.startsWith("Clasa a V-a")) {
        const lastChar = formatiune.slice(-1);
        cls = classesAsObject["5" + lastChar];
    }
    if (!cls) return null;
    return {
        class: { id: cls._id, name: cls.name },

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
