import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from './core/services/authentication.service';
import { routerTransition } from '../../router.animations';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app-state.interfaces';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-layout2',
    animations: [routerTransition],
    templateUrl: './layout2.component.html',
    styleUrls: ['./layout2.component.scss'],
})
export class Layout2Component implements OnInit {
    verticalNavIsCollapsed = false;
    navGroupAdminIsExpanded = true;

    // constructor(public auth: AuthenticationService) {}

    constructor(private store: Store<AppState>) {}

    ngOnInit() {}

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
