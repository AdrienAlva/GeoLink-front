import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

	searchForm: FormGroup;

	members: Member[] = [];
	memberSubscription: Subscription;

	results: Member[] = [];	

	constructor(private formBuilder: FormBuilder,
				private membersService: MembersService) { }

	ngOnInit(): void {
		this.initForm();

		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => this.onMembersLoading(members)
			);

		this.membersService.getMembers();
	}//Eo ngOnInit()

	initForm() {
		this.searchForm = this.formBuilder.group({
			keyWord: []
		});
	}//Eo initForm()

	onMembersLoading(members: Member[]){
		this.members = members;
	}//Eo onMembersLoading()

	onSearchMember() {
		console.log('On recherche !');
		console.log(this.searchForm.get('keyWord').value);

		this.results = [];

		let userSearch = this.searchForm.get('keyWord').value.trim().toLowerCase().replace(/ /g, '');// replace configuré ainsi supprime tout les inners spaces.

		console.log(userSearch);

		console.log(this.members);

		for(let i=0; i<this.members.length; i++) {
  			for(let key in this.members[i]) {
    			if(this.members[i][key].toString().indexOf(userSearch) !=- 1) {
      				console.log('Trouvé ! ' + this.members[i][key].toString().indexOf(userSearch) + ' + ' + this.members[i].name);

      				this.results[i] = this.members[i];

      				console.log(this.results);

    			} else {
    				console.log('Pas de résultats...');
    			}//Eo if / else
  			}//Eo for
		}//Eo for
		
	}//Eo onSearchMember()


}//Eo class
