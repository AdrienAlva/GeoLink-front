import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.css']
})
export class RegisterProfileComponent implements OnInit {

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
	  		category1: '',
	  		category2: '',
	  		about: ''
		});
	}//Eo initForm()

	onSubmitRegisterProfile() {
  	const registerData = this.registerProfileForm.value;
  	
	this.httpClient.post('http://localhost:3000/register-profile', registerData)
		.subscribe(
		    (res) => {
		      console.log('Envoi de la demande de création de profil !');
		    },
		    (err) => {
		      console.log('Erreur ! : ' + err);
		    }
		);  
    }//Eo onSubmitLogin()

}//Eo class
