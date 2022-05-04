import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseUrl } from '../shared/baseUrl';
import { lastValueFrom, Observable, of } from 'rxjs';
import { delay, map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  

  constructor(private http:HttpClient,private processHttpMsgService: ProcessHttpMsgService ) { }

  // getDishes():Promise<Dish[]>{

  //   return lastValueFrom(of(DISHES).pipe(delay(2000)));


  //   // return new Promise(resolve=>{
  //   //     setTimeout(()=>resolve(DISHES),2000);
  //   // });
  //  // return Promise.resolve(DISHES);
  // }

  // getDish(id: string): Promise<Dish> {
  //   return lastValueFrom(of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)));

  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve(DISHES.filter((dish) => (dish.id === id))[0]),2000);
  // // });
  //   //return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
  // }

  // getFeaturedDish():Promise< Dish> {

  //   return lastValueFrom(of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)));
  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve(DISHES.filter((dish) => dish.featured)[0]),2000);
  // // });
  //   // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  // }


  
  //returning observables
  getDishes(): Observable<Dish[]> {
  //  return of(DISHES).pipe(delay(2000));
  return this.http.get<Dish[]>(baseUrl + 'dishes').pipe(
    catchError(this.processHttpMsgService.handleError)
  );

}

getDish(id: string): Observable<Dish> {
 // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
 return this.http.get<Dish>(baseUrl + 'dishes/' + id).pipe(
  catchError(this.processHttpMsgService.handleError));
}

getFeaturedDish():Observable< Dish >{
 // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
 return this.http.get<Dish[]>(baseUrl + 'dishes?featured=true').pipe(map(dishes=>dishes[0])).pipe(
  catchError(this.processHttpMsgService.handleError));
}

getDishIds(): Observable<string[] | any> {
 // return of(DISHES.map(dish => dish.id ));
 return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id))).pipe(catchError(error => error));
}


putDish(dish:Dish): Observable<Dish>{

const httpOptions={
  headers : new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
return this.http.put<Dish>(baseUrl + 'dishes/' +dish.id,dish,httpOptions)
.pipe(catchError(this.processHttpMsgService.handleError));
}

// deleteDish(dish : Dish): Observable<any>{
//   return this.http.delete(baseUrl + 'dishes/' + dish.id).pipe(catchError(this.processHttpMsgService.handleError));
// }

}

