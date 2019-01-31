import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Entity } from '../../../core/interfaces/entity.interfaces';

import { Store } from '@ngrx/store';
import { ExtendedAppState } from '../../state/entity.interfaces';
import * as EntityActions from '../../state/entity.actions';
import * as RouterActions from '../../../core/state/router/router.actions';
import * as EntitySelectors from '../../state/entity.selectors';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as BreadcrumbActions from '../../../core/state/breadcrumb/breadcrumb.actions';
import { BreadcrumbItem } from '../../../core/interfaces/breadcrumb.interfaces';
import * as BreadcrumbSelectors from '../../../core/state/breadcrumb/breadcrumb.selectors';

@Component({
    selector: 'app-entity-create-page',
    templateUrl: './entity-create-page.component.html',
    styleUrls: ['./entity-create-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityCreatePageComponent implements OnInit {
    entity$: Observable<Entity>;
    breadcrumbItems$: Observable<BreadcrumbItem[]>;
    title: string;

    constructor(private store: Store<ExtendedAppState>) {}

    ngOnInit() {
        this.title = 'Adauga entitate';
        this.breadcrumbItems$ = this.store.select(BreadcrumbSelectors.getBreadcrumbItems);
        const breadcrumbItems: BreadcrumbItem[] = [
            {
                name: 'Entitati',
                url: '/entities',
            },
            {
                name: this.title,
                url: '',
            },
        ];
        this.store.dispatch(new BreadcrumbActions.SetBreadcrumb(breadcrumbItems));
    }
}
