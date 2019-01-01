import { mongoHelper } from "../helpers";
import { ITeacher } from "../interfaces";

const collection = "teachers";

export const teacherService = {
    getAll: async (): Promise<ITeacher[]> => {
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
        const teacher = await db.collection(collection).findOne({ _id: id });
        return teacher;
    },

    insertOne: async (teacher: ITeacher) => {
        const db = await mongoHelper.getDb();
        return await db.collection(collection).insertOne(teacher);
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
