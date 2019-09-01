const mongoHelper = require("../helpers/mongo.helper");
const { ObjectID } = require("mongodb");

const collection = "persons";

exports.getOneById = async id => {
    const db = await mongoHelper.getDb();
    return await db.collection(collection).findOne({ _id: new ObjectID(id) });
};

exports.getAll = async filter => {
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find(filter)
        .toArray();
};

exports.getByIds = async ids => {
    const idsAsObjectID = ids.map(x => new ObjectID(x));
    const db = await mongoHelper.getDb();
    return await db
        .collection(collection)
        .find({ _id: { $in: idsAsObjectID } })
        .sort({ lastName: 1 })
        .toArray();
};

exports.insertMany = async items => {
    const db = await mongoHelper.getDb();
    return await db.collection(collection).insertMany(items);
};

exports.insertOne = async student => {
    const db = await mongoHelper.getDb();
    return await db.collection(collection).insertOne(student);
};
