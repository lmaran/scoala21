import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState } from './entity.interfaces';

// get a slice of state (in this case, only the entity related state)
const getEntityFeatureState = createFeatureSelector<EntityState>('entity');

// export const getShowProductCode = createSelector(
//     getProductFeatureState,
//     state => state.showProductCode
// );

// export const getCurrentProductId = createSelector(
//     getProductFeatureState,
//     state => state.currentProductId
// );

// export const getCurrentProduct = createSelector(
//     getProductFeatureState,
//     getCurrentProductId,
//     (state, currentProductId) => {
//         if (currentProductId === 0) {
//             return {
//                 id: 0,
//                 productName: '',
//                 productCode: 'New',
//                 description: '',
//                 starRating: 0
//             };
//         } else {
//             return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
//         }
//     }
// );

// here 'state' is the result of first argument
export const getEntities = createSelector(getEntityFeatureState, state => Object.values(state.entities));

export const getCurrentEntityId = createSelector(getEntityFeatureState, state => state.currentEntityId);

// 'state' and 'currentEntityIs' are the result of first two arguments
export const getCurrentEntity = createSelector(
    getEntityFeatureState,
    getCurrentEntityId,
    (state, currentEntityId) => currentEntityId && state.entities[currentEntityId]
);

export const isEntityLoading = createSelector(getEntityFeatureState, state => state.loading);

export const getError = createSelector(getEntityFeatureState, state => state.error);
