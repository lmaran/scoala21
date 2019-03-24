const mongoHelper = require("../../shared/helpers/mongo.helper");

const collection = "classes";

exports.getAll = async () => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find()
        .toArray();
};

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
