const mongoHelper = require("../../shared/helpers/mongo.helper");

const collection = "lessons";

exports.getLessonsForClass = async classId => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find({ "class.id": classId })
        .sort({ "teacher.name": 1 })
        .toArray();
};
