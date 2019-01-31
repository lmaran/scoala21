import { Action } from '@ngrx/store';
import { BreadcrumbItem } from '../../interfaces/breadcrumb.interfaces';

export enum BreadcrumbActionTypes {
    SET_BREADCRUMB = '[Breadcrumb] Set Breadcrumb',
}

export class SetBreadcrumb implements Action {
    readonly type = BreadcrumbActionTypes.SET_BREADCRUMB;

    constructor(public payload: BreadcrumbItem[]) {}
}

export type BreadcrumbActions = SetBreadcrumb;
