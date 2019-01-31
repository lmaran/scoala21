import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BreadcrumbState } from './breadcrumb-state.interfaces';

// get a slice of state (in this case, only the entity related state)
const getBreadcrumbState = createFeatureSelector<BreadcrumbState>('breadcrumb');

// here 'state' is the result of first argument
export const getBreadcrumbItems = createSelector(getBreadcrumbState, state => state.breadcrumbItems);
