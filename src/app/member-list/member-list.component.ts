import { Component, OnInit, Input, OnDestroy } from '@angular/core'; 
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

  constructor(private membersService: MembersService) { }

  members: Member[]; //Array local vide.

  memberSubscription: Subscription;

  ngOnInit(): void {
  	this.memberSubscription = this.membersService.membersSubject.subscribe( 
  		(members: any[]) => {
  			this.members = members;
  		}
  	);

  	this.membersService.getMembers();
	  this.membersService.emitMembers();
  }//Eo ngOnInit()

}//Eo class
