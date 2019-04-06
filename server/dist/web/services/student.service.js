const mongoHelper = require("../../shared/helpers/mongo.helper");
const { ObjectID } = require("mongodb");

const collection = "mm-students";

exports.getOneById = async id => {
    const db = await mongoHelper.getDb();
    const teacher = await db.collection(collection).findOne({ _id: new ObjectID(id) });
    return teacher;
};

exports.getOneById2 = async id => {
    const db = await mongoHelper.getDb();
    return await db.collection("students").findOne({ _id: new ObjectID(id) }, { projection: { cnp: 0 } });
};

exports.getStudentsPerGrade = async (period, grade) => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .aggregate([
            { $match: { "grades.period": period, "grades.grade": grade } },
            { $unwind: "$grades" },
            { $project: { shortName: 1, grade: "$grades.grade", class: "$grades.class" } }
        ])
        .toArray();
};

exports.getStudentsPerClass = async classId => {
    const db = await mongoHelper.getDb();
    return await db
        .collection("students")
        .find({ "class.id": classId }, { projection: { allFirstNames: 1, lastName: 1 } })
        .sort({ lastName: 1 })
        .toArray();
};

exports.getAllFromSiiir = async () => {
    const db = await mongoHelper.getDb();
    return await db
        .collection("siiir-elevi")
        .find({ "STATUS ELEV": "Situaţie şcolară deschisă" })
        .project({
            _id: 0,
            CNP: 1,
            NUME: 1,
            PRENUME1: 1,
            PRENUME2: 1,
            PRENUME3: 1,
            "COD FORMATIUNE": 1,
            "TIP FORMATIUNE": 1,
            // NIVEL: 1,
            "STATUS ELEV": 1
        })
        .toArray();
};

exports.insertMany = async students => {
    const db = await mongoHelper.getDb();
    return await db.collection("students").insertMany(students);
};

exports.insertOne = async student => {
    const db = await mongoHelper.getDb();
    return await db.collection("students").insertOne(student);
};

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
