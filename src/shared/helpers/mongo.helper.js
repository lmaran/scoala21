const config = require("../config");
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const dbName = config.mongo_dbName;
const uri = config.mongo_uri;

const ObjectID = mongodb.ObjectID;
let theDb; // this will be re-used so the db is only created once (on first request).

exports.getDb = async () => {
    try {
        if (!theDb) {
            if (!uri) {
                throw new Error("Nu este definit un connection string pentru Mongo.");
            }
            if (!dbName) {
                throw new Error("Nu este definit numele bazei de date.");
            }
            const client = await MongoClient.connect(uri, {
                useNewUrlParser: true
            });
            const db = client.db(dbName);

            theDb = db;
            return db;
        } else {
            // db already exists...
            return theDb;
        }
    } catch (error) {
        throw new Error(error);
    }
};

// used by some tests
exports.removeDbFromCache = () => {
    theDb = null;
};

exports.normalizedId = id => {
    if (ObjectID.isValid(id)) {
        return new ObjectID(id);
    } else {
        return id;
    }
};
