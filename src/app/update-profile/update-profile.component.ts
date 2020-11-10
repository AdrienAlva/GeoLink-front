import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

	memberToUpdate: [];

	successMessage: string;

	constructor(private httpClient: HttpClient,
			  	private formBuilder: FormBuilder,
			  	private router: Router) { }

	ngOnInit(): void {
		this.httpClient.get(AppSettings.API_ENDPOINT + '/api/update-profile').subscribe(
	  		(data: any) => {
	  			this.memberToUpdate = data;
	  		}
  		);
	}//Eo ngOnInit()

	onSubmitVerifiedMember(form: NgForm){

		const data = form.value;
		
  		var res = confirm("Êtes-vous certains de vouloir procéder à ces modifications ?");
		if(res){
			this.httpClient.post(AppSettings.API_ENDPOINT + '/api/update-profile', data)
			.subscribe(
			    (res) => {
			     	this.successMessage = res['message'];
			    },
			    (err) => {
			      console.log('Erreur ! : ' + err);
			    }    
			);
		}	
	}//Eo onSubmitVerifiedMember()

}//Eo class