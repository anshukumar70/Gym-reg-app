import { Component, OnInit } from '@angular/core';
import { User } from '../models/usermodel';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
public userId!: number;
userDetails!: User ;
constructor( 
  private activatedRoute:ActivatedRoute,
  private api:ApiService,
  ){

}
ngOnInit(){
this.activatedRoute.params.subscribe(val=>{
  this.userId = val['id'];
  this.fetchUserDetailes(this.userId)
})
}

fetchUserDetailes(userId:number){
  this.api.getRegistredUserId(userId).subscribe(res=>{
    this.userDetails = res;
    console.log(this.userDetails)
  })
}
}