import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, delay, tap, switchMap } from 'rxjs/operators';

import { EntityService } from '../../core/services/entity.service';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as entityActions from './entity.actions';
import { Entity } from '../../core/interfaces/entity.interfaces';

@Injectable()
export class EntityEffects {
    constructor(
        private entityService: EntityService,
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}

    @Effect()
    getAllEntities$: Observable<Action> = this.actions$.pipe(
        ofType(entityActions.EntityActionTypes.GET_ALL),
        mergeMap(action =>
            this.entityService.getAllEntities().pipe(
                delay(200), // just to see the spinner on the screen
                map(entities => new entityActions.GetAllSuccess(entities)),
                catchError(err => of(new entityActions.GetAllFail(err)))
            )
        )
    );

    @Effect()
    getOneEntity$: Observable<Action> = this.actions$.pipe(
        ofType(entityActions.EntityActionTypes.GET_ONE),
        map((action: entityActions.GetOne) => action.payload),

        // ok too
        // mergeMap((entityId: string) =>
        //     this.entityService.getEntityById(entityId).pipe(
        //         map(entity => new entityActions.GetOneSuccess(entity)),
        //         catchError(err => of(new entityActions.GetOneFail(err)))
        //     )
        // )

        // https://github.com/avatsaev/angular-contacts-app-example
        switchMap(entityId => this.entityService.getEntityById(entityId)),
        map((entity: Entity) => new entityActions.GetOneSuccess(entity))
    );

    @Effect()
    updateEntity$: Observable<Action> = this.actions$.pipe(
        ofType(entityActions.EntityActionTypes.UPDATE),
        map((action: entityActions.UpdateEntity) => action.payload),
        mergeMap((entity: Entity) =>
            this.entityService.updateEntity(entity).pipe(
                map(updatedEntity => new entityActions.UpdateEntitySuccess(updatedEntity)),
                catchError(err => of(new entityActions.UpdateEntityFail(err)))
            )
        )
    );

    @Effect()
    deleteEntity$: Observable<Action> = this.actions$.pipe(
        ofType(entityActions.EntityActionTypes.DELETE),
        map((action: entityActions.DeleteEntity) => action.payload),
        mergeMap((entityId: string) =>
            this.entityService.deleteEntityById(entityId).pipe(
                map(() => new entityActions.DeleteEntitySuccess(entityId)),
                catchError(err => of(new entityActions.DeleteEntityFail(err)))
            )
        )
    );
}
