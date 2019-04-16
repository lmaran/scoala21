const mongoHelper = require("../../shared/helpers/mongo.helper");
// const { ObjectID } = require("mongodb");

const collection = "users";

exports.getOneByEmail = async email => {
    const db = await mongoHelper.getDb();
    const user = await db.collection(collection).findOne({ email });
    return user;
};