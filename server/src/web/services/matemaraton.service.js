const mongoHelper = require("../../shared/helpers/mongo.helper");

const collection = "mm-presence";

exports.getLastPresence = async groupId => {
    const db = await mongoHelper.getDb();
    // id = mongoHelper.normalizedId(id);
    // const teacher = await db.collection(collection).findOne({ _id: id });
    return await db.collection(collection).findOne({ groupId: groupId });
};

exports.getPresencePerGroup = async (period, grade, groupName) => {
    const db = await mongoHelper.getDb();
    // id = mongoHelper.normalizedId(id);
    // const teacher = await db.collection(collection).findOne({ _id: id });
    return await db
        .collection(collection)
        .find({ period: period, grade: grade, groupName: groupName })
        .sort({ date: -1 })
        .toArray();
};

exports.getPresencePerPeriod = async period => {
    const db = await mongoHelper.getDb();
    // id = mongoHelper.normalizedId(id);
    // const teacher = await db.collection(collection).findOne({ _id: id });
    return await db
        .collection(collection)
        .find({ period: period })
        .sort({ date: -1 })
        .toArray();
};

exports.getPresencePerStudent = async (period, studentId) => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .aggregate([
            { $match: { period: period, "students.id": { $eq: studentId } } },
            { $project: { _id: 0, date: 1, "students.shortName": 1 } }
        ])
        .toArray();
};

exports.getStudents = async () => {
    const db = await mongoHelper.getDb();
    return await db
        .collection("mm-students")
        .find({ edition: "1" })
        .toArray();
};

exports.getStudentsPerGrade = async (period, grade) => {
    const db = await mongoHelper.getDb();
    return await db
        .collection("students")
        .aggregate([
            { $match: { "grades.period": period, "grades.grade": grade } },
            { $unwind: "$grades" },
            { $project: { shortName: 1, grade: "$grades.grade", class: "$grades.class" } }
        ])
        .toArray();
};

exports.getCurrentEdition = async () => {
    const db = await mongoHelper.getDb();
    return await db.collection("mm-editions").findOne({ isCurrent: true });
};

exports.getCurrentEditionVer2 = async () => { // no need for 'isCurrent' field
    const db = await mongoHelper.getDb();
    return await db.collection("mm-editions").findOne({}, { sort: { period: -1 } });
};

exports.getSelectedEdition = async edition => {
    const db = await mongoHelper.getDb();
    return await db.collection("mm-editions").findOne({ edition: edition });
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
