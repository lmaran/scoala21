const mongoHelper = require("../../shared/helpers/mongo.helper");

const collection = "staffMembers";

exports.getAll = async () => {
    const db = await mongoHelper.getDb();
    const staff = await db
        .collection(collection)
        .find()
        .toArray();
    return staff;
};
