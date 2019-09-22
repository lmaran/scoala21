const mongoHelper = require("../../shared/helpers/mongo.helper");
const { ObjectID } = require("mongodb");

const collection = "classes";

exports.getAll = async () => {
    const db = await mongoHelper.getDb();
    return db
        .collection(collection)
        .find()
        .sort({ grade: -1, name: 1 })
        .toArray();
};

exports.getClassesByAcademicYear = async academicYear => {
    const db = await mongoHelper.getDb();
    return db
        .collection(collection)
        .find({ academicYear })
        .toArray();
};

exports.getOneById = async id => {
    const db = await mongoHelper.getDb();
    return db.collection(collection).findOne({ _id: new ObjectID(id) });
};

exports.getClassByStudentId = async (academicYear, studentId) => {
    const db = await mongoHelper.getDb();
    return db.collection(collection).findOne({ academicYear, members: studentId });
};

exports.getPrimaryClassForTeacher = async teacherId => {
    const db = await mongoHelper.getDb();
    return db.collection(collection).findOne({ "classTeacher.id": teacherId.toString() });
};

exports.bulkWrite = async mongoOps => {
    const db = await mongoHelper.getDb();
    // return db.collection(collection).updateMany({}, { $set: items }, { upsert: true });
    return db.collection(collection).bulkWrite(mongoOps, { ordered: false });
};

// exports.insertOne = async teacher => {
//     const db = await mongoHelper.getDb();
//     return await db.collection(collection).insertOne(teacher);
// };

exports.insertMany = async items => {
    const db = await mongoHelper.getDb();
    return await db.collection(collection).insertMany(items);
};

exports.updateOne = async item => {
    const db = await mongoHelper.getDb();
    // item._id = mongoHelper.normalizedId(item._id);
    return db.collection(collection).updateOne({ _id: item._id }, { $set: item }, { upsert: true });
};

// exports.deleteOneById = async id => {
//     const db = await mongoHelper.getDb();
//     id = mongoHelper.normalizedId(id);
//     return await db.collection(collection).deleteOne({ _id: id });
// };
