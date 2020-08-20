import { Component, OnInit, Input, OnDestroy } from '@angular/core'; 
import { Router } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  @Input() cartographie: string;
  @Input() dronistique: string;
  @Input() javascript: string;

  constructor(private membersService: MembersService,private router: Router) { }

  members: Member[]; //Array local vide.

  memberSubscription: Subscription;

  studentlist: [];

  ngOnInit(): void {
  	this.memberSubscription = this.membersService.membersSubject.subscribe( 
  		(members: any[]) => {
  			this.members = members;
        console.log(this.members);
  		}
  	);

  	this.membersService.getMembers();
	  this.membersService.emitMembers();
  }//Eo ngOnInit()

  onViewMember(id: number) {
    this.router.navigate(['member', 'profile', id]);
  }//Eo onViewBook()

}//Eo class
