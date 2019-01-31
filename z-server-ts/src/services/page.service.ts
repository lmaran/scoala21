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

    getOneBySlug: async (slug: string) => {
        const db = await mongoHelper.getDb();
        return await db.collection(collection).findOne({ slug: slug });
    },

    insertOne: async (page: IPage) => {
        const db = await mongoHelper.getDb();
        return await db.collection(collection).insertOne(page);
    },

    updateOne: async (page: IPage) => {
        const db = await mongoHelper.getDb();
        page._id = mongoHelper.normalizedId(page._id);
        return await db.collection(collection).updateOne({ _id: page._id }, { $set: page });
    },

    deleteOneById: async (id: any) => {
        const db = await mongoHelper.getDb();
        id = mongoHelper.normalizedId(id);
        return await db.collection(collection).deleteOne({ _id: id });
    },
};
