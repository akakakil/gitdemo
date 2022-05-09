import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animations';
import { LeaderService } from '../services/leader.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})
export class AboutComponent implements OnInit {

  leaders?:leader[];
  errrorMsg!:string;

  constructor(private leaderService:LeaderService,
    @Inject('baseUrl') public baseUrl:any) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(
      (leaders)=>this.leaders=leaders,
      errmsg=>this.errrorMsg=errmsg
    );
  }



}
