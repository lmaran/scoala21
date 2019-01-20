import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { User } from '../interfaces/user.interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>('api/users').pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    public getUserById(userId: string): Observable<User> {
        return this.http.get<User>(`admin/api/users/${userId}`).pipe(
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError) // then handle the error
        );
    }

    public createUser(user: User): Observable<User> {
        return this.http.post<User>('admin/api/users', user).pipe(
            // catchError(this.handleError('addUser', user)) // then handle the error
            catchError(this.handleError) // then handle the error
        );
    }

    public updateUser(user: User): Observable<User> {
        return (
            this.http
                .put<User>(`admin/api/users`, user)
                //   .map(response => {
                //     return new User(response.json());
                //   })
                .pipe(
                    // catchError(this.handleError('updateHero', hero))
                    catchError(this.handleError)
                )
        );
    }

    // public deleteUserById(userId: string): Observable<HttpResponse<number>> {
    //     console.log(userId);
    //     return (
    //         this.http
    //             // .delete(API_URL + '/users/' + userId)
    //             .delete(`admin/api/users/${userId}`)
    //             .map((response: HttpResponse<number>) => response.status)
    //             .catch(this.handleError)
    //     );
    // }

    public deleteUserById(userId: string): Observable<{}> {
        const url = `admin/api/users/${userId}`;
        return (
            this.http
                // .delete(API_URL + '/users/' + userId)
                // tell HttpClient that we want the full response https://stackoverflow.com/a/46809000/2726725
                .delete(url, { observe: 'response' })
                // .map((response: HttpResponse<number>) => response.status)
                // .catch(this.handleError)
                .pipe(
                    // catchError(this.handleError('deleteHero'))
                    catchError(this.handleError)
                )
        );
    }

    // private handleError(error: Response | any) {
    //     console.error('ApiService::handleError', error);
    //     return Observable.throw(error);
    // }

    // https://angular.io/guide/http#getting-error-details
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    }
}
