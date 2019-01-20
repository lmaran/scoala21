import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { AppState } from './app-state.interfaces';
import { breadcrumbReducer } from './breadcrumb/breadcrumb.reducer';

export const reducers: ActionReducerMap<AppState> = {
    router: fromRouter.routerReducer,
    breadcrumb: breadcrumbReducer,
};

// we use 'storeFreeze' meta reducer in order to prevent reducers to mutate the state
// an error is thrown in console (at runtime) when that happens
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
