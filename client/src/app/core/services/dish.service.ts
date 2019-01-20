import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Dish } from '../interfaces/dish.interfaces';
import { Observable, throwError } from 'rxjs';
// import { map, catchError} from 'rxjs/operators';

@Injectable()
export class DishService {
    constructor(private http: HttpClient) {}

    public getAllDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>('app/api/v1/dishes');
    }

    public getDishById(dishId: string): Observable<Dish> {
        return (
            this.http
                // .get(API_URL + '/dishes/' + dishId)
                .get<Dish>(`app/api/v1/dishes/${dishId}`)
            //   .map(response => {
            //     return new Dish(response.json());
            //   })
            // .do(data => console.log('server data:', data)) // debug
            // .catch(this.handleError)
        );
    }

    public createDish(dish: Dish): Observable<Dish> {
        return (
            this.http
                // .post(API_URL + '/dishes', dish)
                .post<Dish>('app/api/v1/dishes', dish)
            //   .map(response => {
            //     return new Dish(response.json());
            //   })
            // .catch(this.handleError)
        );
    }

    public updateDish(dish: Dish): Observable<Dish> {
        return (
            this.http
                // .put(API_URL + '/dishes/' + dish.id, dish)
                .put<Dish>(`app/api/v1/dishes`, dish)
            //   .map(response => {
            //     return new Dish(response.json());
            //   })
            // .catch(this.handleError)
        );
    }

    // public deleteDishById(dishId: string): Observable<HttpResponse<number>> {
    //     console.log(dishId);
    //     return (
    //         this.http
    //             // .delete(API_URL + '/dishes/' + dishId)
    //             .delete(`app/api/v1/dishes/${dishId}`)
    //             .map((response: HttpResponse<number>) => response.status)
    //             .catch(this.handleError)
    //     );
    // }

    public deleteDishById(dishId: string): Observable<{}> {
        const uri = `app/api/v1/dishes/${dishId}`;
        return (
            this.http
                // .delete(API_URL + '/dishes/' + dishId)
                // tell HttpClient that we want the full response https://stackoverflow.com/a/46809000/2726725
                .delete(uri, { observe: 'response' })
            // .map((response: HttpResponse<number>) => response.status)
            // .catch(this.handleError)
        );
    }

    // private handleError(error: Response | any) {
    //     console.error('ApiService::handleError', error);
    //     // return Observable.throw(error);
    //     return throwError('Something bad happened; please try again later.');
    // }
}
