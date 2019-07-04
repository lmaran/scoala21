const mongoHelper = require("../../shared/helpers/mongo.helper");
const { ObjectID, Double } = require("mongodb");

const collection = "gradebookItems";

exports.getLatestGradebookItemsPerStudent = async (studentId, academicYear) => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find({ academicYear: academicYear, "student.id": studentId }, { projection: { class: 0, student: 0 } })
        .sort({ "student.lastName": 1 })
        .toArray();
};

exports.insertOne = async item => {
    // store all numbers as decimals (avoid a mix of NumberInt(7) and 7.0)
    if (item.itemValue) {
        item.itemValue = Double(item.itemValue); // 7 -> 7.0
    }

    const db = await mongoHelper.getDb();
    return await db.collection(collection).insertOne(item);
};

exports.deleteOneById = async id => {
    const db = await mongoHelper.getDb();
    // id = mongoHelper.normalizedId(id);
    return await db.collection(collection).deleteOne({ _id: new ObjectID(id) });
};