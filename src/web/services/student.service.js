const mongoHelper = require("../../shared/helpers/mongo.helper");
const { ObjectID } = require("mongodb");

const collection = "mm-students";

exports.getOneById = async id => {
    const db = await mongoHelper.getDb();
    return await db.collection("students").findOne({ _id: new ObjectID(id) });
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

exports.getAll = async () => {
    const db = await mongoHelper.getDb();
    return await db
        .collection("students")
        .find()
        .toArray();
};

exports.getStudentsByIds = async ids => {
    const idsAsObjectID = ids.map(x => new ObjectID(x));
    const db = await mongoHelper.getDb();
    return await db
        .collection("students")
        .find({ _id: { $in: idsAsObjectID } })
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
            // CNP: 1,
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
