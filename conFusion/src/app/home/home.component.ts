import { Component, OnInit,Inject } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animations';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { leader } from '../shared/leader';
import { Promotion } from '../shared/promotion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),expand()
    ]
})
export class HomeComponent implements OnInit {

  dish?: Dish;
  promotion?: Promotion;
  leader?:leader;
  dishErrMsg!:string;
  leaderErrMsg!:string;
  promoErrMsg!:string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('baseUrl') public baseUrl:any) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(
      (dish)=>this.dish = dish,
      errmess=>this.dishErrMsg=errmess
    );
    this.promotionservice.getFeaturedPromotion().subscribe(
        (promotion)=>this.promotion = promotion,
        errmess=>this.promoErrMsg=errmess
    );
    this.leaderService.getFeaturedLeader().subscribe(
      (leader)=>this.leader=leader,
      errmess=>this.leaderErrMsg=errmess
    );
  }

}
