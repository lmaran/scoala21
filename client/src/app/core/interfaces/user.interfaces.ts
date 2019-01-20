export class User {
    // id: number;
    _id: string;
    firstName: string;
    lastName: string;
    age?: number;
    complete: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
