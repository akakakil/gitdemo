import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  ngOnInit(): void {
  }
  constructor(public _route:Router){}
  navigateNext(value:string){
this._route.navigate([`/${value}`]);
  }
}
