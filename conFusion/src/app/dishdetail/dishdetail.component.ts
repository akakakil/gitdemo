import { Component, Input, OnInit, ViewChild,Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  commentForm!: FormGroup;
  dishIds!: string[];
  prev!: string;
  next!: string;
  dish?:Dish;
  comment!:Comment;

  @ViewChild('fform') commentFormDirective: any;

  formErrors:any= {
    'author': '',
    'comment':''
  };

  validationMessages:any = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.'
    },
  };
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('baseUrl') public baseUrl:any) { 
      this.createForm();
    }

  ngOnInit(): void {
    
    // const id = this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe(
    //   (dish)=>this.dish = dish
    // );
    this.dishservice.getDishIds().subscribe((dishIds)=>this.dishIds=dishIds);
    this.route.params.pipe(switchMap((params:Params)=>this.dishservice.getDish(params['id'])))
    .subscribe(dish=>{this.dish=dish,this.setPrevNext(dish.id);});
  }

  

  createForm(){
    this.commentForm = this.fb.group({
    author: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
    rating:5,
    comment: ''
  });

  this.commentForm.valueChanges
  .subscribe(data => this.onValueChanged(data));

this.onValueChanged(); // (re)set validation messages now
}

onValueChanged(data?:any){
  if (!this.commentForm) { return; }
  const form = this.commentForm;
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    const d = new Date();
    let text = d.toISOString();
    this.commentForm.value.date = text;
    this.comment = this.commentForm.value;
    this.dish?.comments.push(this.comment);
    console.log(this.comment);
    this.commentForm.reset({
      author: '',
      comment: '',
      date:''
    });
    this.commentFormDirective.resetForm({rating:5});
  }

  
}
