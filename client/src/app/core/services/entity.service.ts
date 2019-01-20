import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Entity } from '../interfaces/entity.interfaces';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({ providedIn: 'root' })
export class EntityService {
    private entityUrl = 'app/api/v1/entities';
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('EntityService');
    }

    /*
        Query methods
    */

    public getAllEntities(): Observable<Entity[]> {
        return this.http.get<Entity[]>(this.entityUrl).pipe(catchError(this.handleError('getAllEntities', [])));
    }

    public getEntityById(entityId: string): Observable<Entity> {
        return this.http.get<Entity>(`${this.entityUrl}/${entityId}`);
        // .pipe(catchError(this.handleError('getEntityById', entityId)));
    }

    /*
        Command methods
    */

    public createEntity(entity: Entity): Observable<Entity> {
        return this.http
            .post<Entity>(this.entityUrl, entity)
            .pipe(catchError(this.handleError('createEntity', entity)));
    }

    public updateEntity(entity: Entity): Observable<Entity> {
        return this.http.put<Entity>(this.entityUrl, entity).pipe(catchError(this.handleError('updateEntity', entity)));
    }

    public deleteEntityById(entityId: string): Observable<{}> {
        return this.http.delete(`${this.entityUrl}/${entityId}`).pipe(catchError(this.handleError('deleteEntityById')));
    }
}
