import * as fromRouter from '@ngrx/router-store';
import { BreadcrumbState } from './breadcrumb/breadcrumb-state.interfaces';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface AppState {
    router: fromRouter.RouterReducerState;
    breadcrumb: BreadcrumbState;
}
