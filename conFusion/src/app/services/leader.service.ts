import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, lastValueFrom, Observable,map, of, catchError } from 'rxjs';
import { baseUrl } from '../shared/baseUrl';
import { leader } from '../shared/leader';
import { ProcessHttpMsgService } from './process-http-msg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHttpMsgService:ProcessHttpMsgService) { }

  // getLeaders():Promise<leader[]>{

  //   return lastValueFrom(of(LEADERS).pipe(delay(2000)));

  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve(LEADERS),2000);
  // // });
  //   //return Promise.resolve(LEADERS);
  // }

  // getLeader(id: string): Promise<leader> {

  //   return lastValueFrom(of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)));


  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve(LEADERS.filter((leader) => (leader.id === id))[0]),2000);
  // // });
  //  // return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  // }

  // getFeaturedLeader():Promise< leader >{

  //   return lastValueFrom(of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)));


  // //   return new Promise(resolve=>{
  // //     setTimeout(()=>resolve(LEADERS.filter((leader) => leader.featured)[0]),2000);
  // // });
  //   //return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  // }


  
  //returning observables
  getLeaders(): Observable<leader[]> {

   // return of(LEADERS).pipe(delay(2000));

   return this.http.get<leader[]>(baseUrl+'leadership').pipe(
    catchError(this.processHttpMsgService.handleError)
     );
}

getLeader(id: string): Observable<leader> {
//  return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
 return this.http.get<leader>(baseUrl+'leadership/'+id).pipe(
catchError(this.processHttpMsgService.handleError)
 );
}

getFeaturedLeader():Observable< leader >{
  //return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
  return this.http.get<leader[]>(baseUrl + 'leadership?featured=true').pipe(map(leader=>leader[0])).pipe(
    catchError(this.processHttpMsgService.handleError));
}
}
