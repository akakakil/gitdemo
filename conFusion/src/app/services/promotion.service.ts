import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, lastValueFrom, map, Observable, of } from 'rxjs';
import { baseUrl } from '../shared/baseUrl';
import { Promotion } from '../shared/promotion';
import { ProcessHttpMsgService } from './process-http-msg.service';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHttpMsgService:ProcessHttpMsgService) { }

  // getPromotions(): Promise<Promotion[]> {

  //   return lastValueFrom(of(PROMOTIONS).pipe(delay(2000)));
    
  //   // return new Promise(resolve=>{
  //   //   setTimeout(()=>resolve(PROMOTIONS),2000);
  //   // });
  //   //return Promise.resolve(PROMOTIONS);
  // }

  // getPromotion(id: string): Promise<Promotion> {


  //   return lastValueFrom(of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)));

  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve( PROMOTIONS.filter((promo) => (promo.id === id))[0]),2000);
  // // });
  //   //return Promise.resolve( PROMOTIONS.filter((promo) => (promo.id === id))[0]);
  // }

  // getFeaturedPromotion():Promise< Promotion >{


  //   return lastValueFrom(of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)));

  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),2000);
  // // });
  //  // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
  // }



  //returning observables
  getPromotions(): Observable<Promotion[]> {
    //  return of(PROMOTIONS).pipe(delay(2000));
    return this.http.get<Promotion[]>(baseUrl + 'promotions').pipe(
      catchError(this.processHttpMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
  //  return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  return this.http.get<Promotion>(baseUrl + 'promotions/'+id).pipe(
    catchError(this.processHttpMsgService.handleError));
  }

  getFeaturedPromotion():Observable< Promotion >{
   // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
   return this.http.get<Promotion[]>(baseUrl + 'promotions?featured=true').pipe(map(promotions=>promotions[0])).pipe(
    catchError(this.processHttpMsgService.handleError));
  }

}
