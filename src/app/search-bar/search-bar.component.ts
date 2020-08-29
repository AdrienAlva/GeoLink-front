import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

	noResultDisplay: boolean = false;

	constructor(private formBuilder: FormBuilder,
				private membersService: MembersService,
				private router: Router) { }

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

		this.noResultDisplay = false;

		this.results = [];

		let userSearch = this.searchForm.get('keyWord').value.trim().toLowerCase().replace(/ /g, '');// replace configuré ainsi supprime tout les inners spaces.

		for(let i=0; i<this.members.length; i++) {
  			for(let key in this.members[i]) {
    			if(this.members[i][key].toString().toLowerCase().indexOf(userSearch) !=- 1) {

      				this.results[i] = this.members[i];

      				this.results[i].name = this.results[i].name;

      				this.results[i].surname = this.results[i].surname;

    			} else {
    				console.log('Pas de résultats...');
    			}//Eo if / else
  			}//Eo for	
		}//Eo for

		if (this.results.length === 0) { // affichage du message d'absence de résultats pour la recherche.
    				this.noResultDisplay = true;
    	}//Eo if

	}//Eo onSearchMember()

	onViewMember(id: number) {
  		this.router.navigate(['member', 'profile', id]);
    }//Eo onViewMember()


}//Eo class
