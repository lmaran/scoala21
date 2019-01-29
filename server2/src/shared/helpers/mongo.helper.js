const config = require("../config");
// import { MongoClient, ObjectID, Db } from "mongodb";
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
// const Db = mongodb.Db;

let theDb; // this will be re-used so the db is only created once (on first request).
module.exports = {
    getDb: async () => {
        try {
            if (!theDb) {
                if (!config.mongo || !config.mongo.uri) {
                    throw new Error("Nu este definit un connection string pentru Mongo.");
                }
                if (!config.mongo || !config.mongo.dbName) {
                    throw new Error("Nu este definit numele bazei de date.");
                }
                const client = await MongoClient.connect(config.mongo.uri, config.mongo.options);
                const db = client.db(config.mongo.dbName);

                theDb = db;
                return db;
            } else {
                // db already exists...
                return theDb;
            }
        } catch (error) {
            throw new Error(error);
        }
    },

    // used by some tests
    removeDbFromCache: () => {
        theDb = null;
    },

    normalizedId: id => {
        if (ObjectID.isValid(id)) {
            return new ObjectID(id);
        } else {
            return id;
        }
    },

    // // read
    // getById: function (collection, id, next) {
    //     this.getDb(function (err, db) {
    //         if (err) { return next(err, null); }
    //         id = service.normalizedId(id);
    //         db.collection(collection).findOne({ _id: id }, next);
    //     });
    // }

    // config: config
};
