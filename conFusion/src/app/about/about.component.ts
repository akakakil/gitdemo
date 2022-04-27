import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders?:leader[];
  constructor(private leaderService:LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeaders().then(
      (leaders)=>this.leaders=leaders
    );
  }



}
