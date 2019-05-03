const mongoHelper = require("../../shared/helpers/mongo.helper");
const { ObjectID } = require("mongodb");

const collection = "parents";

exports.getOneById = async id => {
    const db = await mongoHelper.getDb();
    return await db.collection(collection).findOne({ _id: new ObjectID(id) });
};

exports.getAll = async () => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find()
        .toArray();
};

exports.insertOne = async parent => {
    const db = await mongoHelper.getDb();
    return await db.collection(collection).insertOne(parent);
};

// exports.getOneById2 = async id => {
//     const db = await mongoHelper.getDb();
//     return await db.collection("students").findOne({ _id: new ObjectID(id) }, { projection: { cnp: 0 } });
// };

// exports.getStudentsPerGrade = async (period, grade) => {
//     const db = await mongoHelper.getDb();
//     return await db
//         .collection(collection)
//         .aggregate([
//             { $match: { "grades.period": period, "grades.grade": grade } },
//             { $unwind: "$grades" },
//             { $project: { shortName: 1, grade: "$grades.grade", class: "$grades.class" } }
//         ])
//         .toArray();
// };

// exports.getStudentsPerClass = async classId => {
//     const db = await mongoHelper.getDb();
//     const studentsPerClass = await db
//         .collection("studentsAndClasses")
//         .find({ "class.id": classId }, { projection: { "_id":0, "student":1} })
//         .sort({ "student.lastName": 1 })
//         .toArray();

//     // flatten result
//     return studentsPerClass.map(x => {
//         return {
//             id: x.student.id,
//             firstName: x.student.firstName,
//             lastName: x.student.lastName
//         }
//     });
// };

// exports.getClassesPerStudent = async studentId => {
//     const db = await mongoHelper.getDb();
//     const classesPerStudent = await db
//         .collection("studentsAndClasses")
//         .find({ "student.id": studentId }, { projection: { "_id":0, "academicYear":1, "class":1} })
//         .sort({ "class.grade": -1 })
//         .toArray();

//         return classesPerStudent;

//     // flatten result
//     // return classesPerStudent.map(x => {
//     //     return {
//     //         id: x.student.id,
//     //         firstName: x.student.firstName,
//     //         lastName: x.student.lastName
//     //     }
//     // });
// };



// exports.getAllFromSiiir = async () => {
//     const db = await mongoHelper.getDb();
//     return await db
//         .collection("siiir-elevi")
//         .find({ "STATUS ELEV": "Situaţie şcolară deschisă" })
//         .project({
//             _id: 0,
//             CNP: 1,
//             NUME: 1,
//             PRENUME1: 1,
//             PRENUME2: 1,
//             PRENUME3: 1,
//             "COD FORMATIUNE": 1,
//             "TIP FORMATIUNE": 1,
//             // NIVEL: 1,
//             "STATUS ELEV": 1
//         })
//         .toArray();
// };

// exports.insertMany = async students => {
//     const db = await mongoHelper.getDb();
//     return await db.collection("students").insertMany(students);
// };

// exports.insertManyStudentsPerClass = async studentsPerClass => {
//     const db = await mongoHelper.getDb();
//     return await db.collection("studentsPerClass").insertMany(studentsPerClass);
// };

// exports.insertOne = async student => {
//     const db = await mongoHelper.getDb();
//     return await db.collection("students").insertOne(student);
// };

// exports.updateOne = async teacher => {
//     const db = await mongoHelper.getDb();
//     teacher._id = mongoHelper.normalizedId(teacher._id);
//     return await db.collection(collection).updateOne({ _id: teacher._id }, teacher);
// };

// exports.deleteOneById = async id => {
//     const db = await mongoHelper.getDb();
//     id = mongoHelper.normalizedId(id);
//     return await db.collection(collection).deleteOne({ _id: id });
// };
