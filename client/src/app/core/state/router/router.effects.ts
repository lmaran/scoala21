import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as RouterActions from './router.actions';

// https://github.com/ngrx/platform/blob/master/docs/router-store/api.md#effects
// https://github.com/amcdnl/ngrx-router + https://medium.com/@amcdnl/angular-routing-data-with-ngrx-effects-1cda1bd5e579
// https://angular.schule/blog/2018-06-5-useful-effects-without-actions
// https://github.com/orizens/echoes-player/blob/master/src/app/core/effects/router.effects.ts

@Injectable()
export class RouterEffects {
    @Effect({ dispatch: false })
    navigate$ = this.actions$.ofType(RouterActions.GO).pipe(
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras }) => this.router.navigate(path, { queryParams, ...extras }))
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.ofType(RouterActions.BACK).pipe(tap(() => this.location.back()));

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.ofType(RouterActions.FORWARD).pipe(tap(() => this.location.forward()));

    constructor(private actions$: Actions, private router: Router, private location: Location) {}
}
