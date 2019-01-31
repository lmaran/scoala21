import { BreadcrumbActionTypes, BreadcrumbActions } from './breadcrumb.actions';
import { BreadcrumbState } from './breadcrumb-state.interfaces';

const initialState: BreadcrumbState = {
    breadcrumbItems: [],
};

export function breadcrumbReducer(state: BreadcrumbState = initialState, action: BreadcrumbActions): BreadcrumbState {
    switch (action.type) {
        case BreadcrumbActionTypes.SET_BREADCRUMB:
            return {
                ...state,
                breadcrumbItems: [...action.payload],
            };

        default:
            return state;
    }
}
