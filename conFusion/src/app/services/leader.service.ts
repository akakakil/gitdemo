import { Injectable } from '@angular/core';
import { delay, lastValueFrom, Observable, of } from 'rxjs';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

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
    return of(LEADERS).pipe(delay(2000));
}

getLeader(id: string): Observable<leader> {
  return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));

}

getFeaturedLeader():Observable< leader >{
  return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
}
}
