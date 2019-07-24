const mongoHelper = require("../../shared/helpers/mongo.helper");

const collection = "grades";

exports.getAll = async () => {
    const db = await mongoHelper.getDb();
    return db
        .collection(collection)
        .find()
        .toArray();
};
