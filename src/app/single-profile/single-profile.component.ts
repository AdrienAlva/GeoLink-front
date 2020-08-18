import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.css']
})
export class SingleProfileComponent implements OnInit {

	members: Member[] = [];
	memberSubscription: Subscription;

	memberId: number;
	

	constructor(private membersService: MembersService,
				private router: Router,
				private route: ActivatedRoute) {}

	ngOnInit(){
		this.memberId = this.route.snapshot.params['id']; // on récupère l'id du membre en faisant un snapshot de la route.

		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => {this.onMembersLoading(members);
	  			console.log(this.members[this.memberId].lat);}
			);

		this.membersService.getMembers();	

	}//Eo ngOnInit()

	onMembersLoading(members: Member[]){
		this.members = members;
	}//Eo onMembersLoading()

}//Eo class
