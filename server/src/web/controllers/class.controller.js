const classService = require("../services/class.service");

exports.getAll = async (req, res) => {
    const classes = await classService.getAll();

    // tmpGrades = {
    //      "5c88123e5926db0d231fa314": {id: "5c88123e5926db0d231fa314", name: "5"},
    // etc }
    const tmpGrades = {};

    const classesByGradeAsObject = {};
    classes.forEach(cls => {
        const grade = cls.grade;
        if (grade) {
            if (classesByGradeAsObject[grade.id]) {
                classesByGradeAsObject[grade.id].push(cls);
            } else {
                classesByGradeAsObject[grade.id] = [cls];
                tmpGrades[grade.id] = grade; // used later to get details about a specific grade
            }
        }
    });

    // classesByGrade: [
    //      { grade: {"id": "5c88123e5926db0d231fa314", name: "5"}, classes:[] },
    // etc ]
    const classesByGrade = Object.keys(classesByGradeAsObject).map(key => {
        return {
            grade: tmpGrades[key],
            classes: classesByGradeAsObject[key]
        };
    });

    const data = {
        // classesByGrade,
        classesByGrade,
        ctx: req.ctx
    };

    // res.send(data);
    res.render("class/classes", data);
};

// item in DB (sample):
// {
//     "_id" : ObjectId("5c880fb65926db0d231fa30b"),
//     "name" : "5A-demo",
//     "shortName" : "5A-demo",
//     "grade" : {
//         "id" : "5c88123e5926db0d231fa314",
//         "name" : "5"
//     },
//     "homeRoom" : {
//         "id" : "123",
//         "name" : "asd"
//     },
//     "classTeacher" : {
//         "id" : "123",
//         "name" : "ss"
//     },
//     "divisions" : [
//         [
//             {
//                 "isEntireClass" : true,
//                 "name" : "Intreaga clasa",
//                 "nrOfStudents" : 20.0
//             }
//         ],
//         [
//             {
//                 "name" : "Mate-Avansati",
//                 "nrOfStudents" : 5.0
//             },
//             {
//                 "name" : "Mate-Incepatori",
//                 "nrOfStudents" : 8.0
//             }
//         ]
//     ]
// }
