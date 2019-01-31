import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbItem } from '../../../core/interfaces/breadcrumb.interfaces';
import * as RouterActions from '../../../core/state/router/router.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app-state.interfaces';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
    @Input() breadcrumbItems: BreadcrumbItem[];

    constructor(private store: Store<AppState>) {}

    ngOnInit() {}

    goBack = function() {
        this.store.dispatch(new RouterActions.Back());
    };
}
