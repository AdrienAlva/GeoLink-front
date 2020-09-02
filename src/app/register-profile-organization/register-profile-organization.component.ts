import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-profile-organization',
  templateUrl: './register-profile-organization.component.html',
  styleUrls: ['./register-profile-organization.component.css']
})
export class RegisterProfileOrganizationComponent implements OnInit {

	registerProfileForm: FormGroup;

	constructor(public httpClient: HttpClient,
				  private formBuilder: FormBuilder,
				  private router: Router) { }

	ngOnInit(): void {
		this.initForm();
	}//Eo ngOnInit()

	initForm(){
		this.registerProfileForm = this.formBuilder.group({
	  		surname: '',
	  		name: '',
	  		status: '',
	  		lat: null,
	  		lng: null,
	  		thematic1: '',
	  		thematic2: '',
	  		thematic3: '',
	  		thematic4: '',
	  		thematic5: '',
	  		about: ''
		});
	}//Eo initForm()

	onSubmitRegisterProfile() {
  	const registerData = this.registerProfileForm.value;
  	
  	var res = confirm("Êtes-vous sûr des informations renseignées ?");
		if(res){
			this.httpClient.post('http://localhost:3000/register-profile-organization', registerData)
			.subscribe(
			    (res) => {
			      console.log('Envoi de la demande de création de profil !');
			    },
			    (err) => {
			      console.log('Erreur ! : ' + err);
			    }    
			);
			this.router.navigate(['sent-request']);
		} 
    }//Eo onSubmitLogin()

}//Eo class
