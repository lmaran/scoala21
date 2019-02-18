const mongoHelper = require("../../shared/helpers/mongo.helper");

const collection = "mm-presence";

exports.getLastPresence = async groupId => {
    const db = await mongoHelper.getDb();
    // id = mongoHelper.normalizedId(id);
    // const teacher = await db.collection(collection).findOne({ _id: id });
    return await db.collection(collection).findOne({ groupId: groupId });
};

exports.getPresencePerGroup = async groupId => {
    const db = await mongoHelper.getDb();
    // id = mongoHelper.normalizedId(id);
    // const teacher = await db.collection(collection).findOne({ _id: id });
    return await db
        .collection(collection)
        .find({ edition: "1", groupId: groupId })
        .toArray();
};

exports.getPresencePerStudent = async studentId => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .aggregate([{ $match: { edition: "1", "students.id": { $eq: studentId } } }, { $project: { _id: 0, date: 1 } }])
        .toArray();
};

exports.getStudents = async () => {
    const db = await mongoHelper.getDb();
    return await db
        .collection("mm-students")
        .find({ edition: "1" })
        .toArray();
};

// exports.getAll = async () => {
//     const db = await mongoHelper.getDb();
//     const teachers = await db
//         .collection(collection)
//         .find()
//         .toArray();
//     return teachers;
// };

// exports.getOneById = async id => {
//     const db = await mongoHelper.getDb();
//     id = mongoHelper.normalizedId(id);
//     const teacher = await db.collection(collection).findOne({ _id: id });
//     return teacher;
// };

// exports.insertOne = async teacher => {
//     const db = await mongoHelper.getDb();
//     return await db.collection(collection).insertOne(teacher);
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
