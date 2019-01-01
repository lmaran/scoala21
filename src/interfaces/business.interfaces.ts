export interface IClient {
    client_id: string;
    client_secret: string;
    redirect_uris: string[];
    scope: string;
    tenantCode: string;
}

// export interface IUsersObj {
//     [key: string]: IUser;
// }

export interface IOptionsUri {
    error?: string;
    code?: string;
    state?: string;
}

export interface IPersistedPassword {
    salt: string;
    hashedPassword: string;
}

export interface IContext {
    accessToken?: any;
    tenantCode?: string;
    requestId?: string;
}

export interface ITeacher {
    _id: string;
    firstName: string;
    lastName: string;
    holder?: boolean; // titular?
    degree?: string; // gradul didactic (gr. I)
    area?: string; // catedra (Om si societate)
    subject?: string; // disciplina (Filosofie si Cultura civica)
    isManager?: boolean; // sef de catedra?
}

export interface IStaff {
    _id: string;
    firstName: string;
    lastName: string;
    title?: string; // prof. inv.
    role?: string; // consilier educativ
}
