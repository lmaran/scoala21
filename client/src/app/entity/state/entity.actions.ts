import { Action } from '@ngrx/store';
import { Entity } from '../../core/interfaces/entity.interfaces';

export enum EntityActionTypes {
    // SetCurrentEntity = '[Entity] Set Current Entity',

    InitializeCurrentEntity = '[Entity] Initialize Current Entity',

    GET_ALL = '[Entity] Get All',
    GET_ALL_SUCCESS = '[Entity] Get All Success',
    GET_ALL_FAIL = '[Entity] Get All Fail',

    GET_ONE = '[Entity] Get One',
    GET_ONE_SUCCESS = '[Entity] Get One Success',
    GET_ONE_FAIL = '[Entity] Get One Fail',

    UPDATE = '[Entity] Update',
    UPDATE_SUCCESS = '[Entity] Update Success',
    UPDATE_FAIL = '[Entity] Update Fail',

    CREATE = '[Entity] Create',
    CREATE_SUCCESS = '[Entity] Create Success',
    CREATE_FAIL = '[Entity] Create Fail',

    DELETE = '[Entity] Delete',
    DELETE_SUCCESS = '[Entity] Delete Success',
    DELETE_FAIL = '[Entity] Delete Fail',

    SET_CURRENT_ENTITY_ID = '[Entity] Set current Id',
}

// update
export class UpdateEntity implements Action {
    readonly type = EntityActionTypes.UPDATE;

    constructor(public payload: Entity) {}
}

// update
export class UpdateEntitySuccess implements Action {
    readonly type = EntityActionTypes.UPDATE_SUCCESS;

    constructor(public payload: Entity) {}
}

export class UpdateEntityFail implements Action {
    readonly type = EntityActionTypes.UPDATE_FAIL;

    constructor(public payload: string) {}
}

// delete
export class DeleteEntity implements Action {
    readonly type = EntityActionTypes.DELETE;

    constructor(public payload: string) {}
}

export class DeleteEntitySuccess implements Action {
    readonly type = EntityActionTypes.DELETE_SUCCESS;

    constructor(public payload: string) {}
}

export class DeleteEntityFail implements Action {
    readonly type = EntityActionTypes.DELETE_FAIL;

    constructor(public payload: string) {}
}

// load all
export class GetAll implements Action {
    readonly type = EntityActionTypes.GET_ALL;
}

export class GetAllSuccess implements Action {
    readonly type = EntityActionTypes.GET_ALL_SUCCESS;

    constructor(public payload: Entity[]) {}
}

export class GetAllFail implements Action {
    readonly type = EntityActionTypes.GET_ALL_FAIL;

    constructor(public payload: any) {}
}

// load one
export class GetOne implements Action {
    readonly type = EntityActionTypes.GET_ONE;

    constructor(public payload: string) {}
}

export class GetOneSuccess implements Action {
    readonly type = EntityActionTypes.GET_ONE_SUCCESS;

    constructor(public payload: Entity) {}
}

export class GetOneFail implements Action {
    readonly type = EntityActionTypes.GET_ONE_FAIL;

    constructor(public payload: any) {}
}

// set current entity ID
export class SetCurrentEntityId implements Action {
    readonly type = EntityActionTypes.SET_CURRENT_ENTITY_ID;

    constructor(public payload: string) {}
}

export type EntityActions =
    | DeleteEntity
    | GetAll
    | GetAllSuccess
    | GetAllFail
    | GetOne
    | GetOneSuccess
    | GetOneFail
    | DeleteEntity
    | DeleteEntitySuccess
    | DeleteEntityFail
    | SetCurrentEntityId
    | UpdateEntity
    | UpdateEntitySuccess
    | UpdateEntityFail;
