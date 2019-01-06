import { mongoHelper } from "../helpers";
import { IPage } from "../interfaces";

const collection = "pages";

export const pageService = {
    getAll: async (): Promise<IPage[]> => {
        const db = await mongoHelper.getDb();
        const teachers = await db
            .collection(collection)
            .find()
            .toArray();
        return teachers;
    },

    getOneById: async (id: any) => {
        const db = await mongoHelper.getDb();
        id = mongoHelper.normalizedId(id);
        return await db.collection(collection).findOne({ _id: id });
    },

    insertOne: async (page: IPage) => {
        const db = await mongoHelper.getDb();
        return await db.collection(collection).insertOne(page);
    },

    updateOne: async (teacher: any) => {
        const db = await mongoHelper.getDb();
        teacher._id = mongoHelper.normalizedId(teacher._id);
        return await db.collection(collection).updateOne({ _id: teacher._id }, teacher);
    },

    deleteOneById: async (id: any) => {
        const db = await mongoHelper.getDb();
        id = mongoHelper.normalizedId(id);
        return await db.collection(collection).deleteOne({ _id: id });
    },
};
