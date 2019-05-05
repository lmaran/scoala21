const mongoHelper = require("../../shared/helpers/mongo.helper");
// const { ObjectID } = require("mongodb");

const collection = "gradebookItems";

exports.getLatestGradebookItemsPerStudent = async (studentId, academicYear) => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find({ academicYear: academicYear, "student.id": studentId }, { projection: { _id: 0, class: 0, student: 0 } })
        .sort({ "student.lastName": 1 })
        .toArray();
};
