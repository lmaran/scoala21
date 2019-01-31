import { EntityActionTypes, EntityActions } from './entity.actions';
import { EntityState } from './entity.interfaces';
import { Entity } from '../../core/interfaces/entity.interfaces';

const initialState: EntityState = {
    currentEntityId: null,
    entities: {},
    loading: false,
    error: '',
};

let entityTmp: Entity;
let entitiesTmp: Entity[];
let idTmp: string;

export function reducer(state: EntityState = initialState, action: EntityActions): EntityState {
    switch (action.type) {
        // get all
        case EntityActionTypes.GET_ALL:
            return {
                ...state,
                currentEntityId: null,
                loading: true,
            };
        case EntityActionTypes.GET_ALL_SUCCESS:
            entitiesTmp = <Entity[]>action.payload;
            return {
                ...state,
                entities: entitiesTmp.reduce((obj: { [id: string]: Entity }, item: Entity) => {
                    obj[item._id] = item;
                    return obj;
                }, {}),
                loading: false,
                error: '',
            };

        case EntityActionTypes.GET_ALL_FAIL:
            return {
                ...state,
                entities: {},
                loading: false,
                error: action.payload,
            };

        // get one
        case EntityActionTypes.GET_ONE:
            idTmp = <string>action.payload;
            return {
                ...state,
                currentEntityId: idTmp,
                loading: false,
                error: '',
            };

        case EntityActionTypes.GET_ONE_SUCCESS:
            entityTmp = action.payload;
            return {
                ...state,
                currentEntityId: entityTmp._id,
                entities: {
                    ...state.entities,
                    [entityTmp._id]: entityTmp,
                },
                loading: false,
                error: '',
            };

        case EntityActionTypes.GET_ONE_FAIL:
            return {
                ...state,
                entities: {},
                loading: false,
                error: action.payload,
            };

        // delete
        case EntityActionTypes.DELETE:
            // https://coderwall.com/p/xrssxg/immutable-way-to-delete-a-key-from-an-object
            // https://stackoverflow.com/a/47227198/2726725
            idTmp = action.payload;
            const { [idTmp]: deleted, ...newEntities } = state.entities;
            return {
                ...state,
                entities: newEntities,
                error: '',
            };

        case EntityActionTypes.DELETE_SUCCESS:
            return {
                ...state,
                entities: newEntities,
                currentEntityId: null,
                error: '',
            };

        case EntityActionTypes.DELETE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        // update
        case EntityActionTypes.UPDATE_SUCCESS:
            entityTmp = action.payload;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    [entityTmp._id]: entityTmp,
                },
                currentEntityId: entityTmp._id,
                error: '',
            };

        case EntityActionTypes.UPDATE_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        // setCurent
        case EntityActionTypes.SET_CURRENT_ENTITY_ID: {
            return {
                ...state,
                currentEntityId: action.payload,
            };
        }

        default:
            return state;
    }
}
