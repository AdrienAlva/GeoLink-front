import { Injectable } from '@angular/core';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class MemberToDisplayService {

	membersToDisplay: Member[] = [];

	status = 'all';

	thematic = 'all';

  	constructor(private membersService: MembersService) { }

  	filterByCategory(members: Member[]) {

		this.membersToDisplay = [];
		for(let member of members) {
	      	if(this.status == 'all' && this.thematic == 'all'){

	        	this.membersToDisplay.push(member);
	    	
	      	} else if (this.status != 'all' && this.thematic == 'all') {

	          	if(member.status.indexOf(this.status) > -1){

	            	this.membersToDisplay.push(member);

	          	}
	      	} else if (this.status == 'all' && this.thematic != 'all') {
	   	
	          	if(member.thematics.indexOf(this.thematic) > -1){

	          		this.membersToDisplay.push(member);

	          	}
	      	} else if (this.status != 'all' && this.thematic != 'all') {
	   	
	          	if(member.thematics.indexOf(this.thematic) > -1 && member.status.indexOf(this.status) > -1 ){

	          		this.membersToDisplay.push(member);

	          	}
	      	}
    	}
  			/*}*/
  		/*});*/

  		


	    
    }//Eo filterByCategory() 

}//Eo class
