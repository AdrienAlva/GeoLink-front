import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {AppSettings } from '../app.settings';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

	updatePasswordForm: FormGroup;

	tokenParam: string;

	errorMessage: string;
	successMessage: string;
	resetting: boolean = true;

	constructor(private httpClient: HttpClient,
		      	private formBuilder: FormBuilder,
		      	private route: ActivatedRoute,
		      	private router: Router) { }

	ngOnInit(): void {
		this.tokenParam = this.route.snapshot.paramMap.get('id');
	  	this.initForm();
	}//Eo ngOnInit()

	initForm(){
		this.updatePasswordForm = this.formBuilder.group({
	  		password: ['',[ Validators.required, Validators.minLength(8)]],
	  		passwordConfirm: ['',[ Validators.required, Validators.minLength(8)]],
	  		token: this.tokenParam
		});
	}//Eo initForm()

	get f() { return this.updatePasswordForm.controls; }

	onSubmitUpdatePassword() {
		const data = this.updatePasswordForm.value;

		this.httpClient.post(AppSettings.API_ENDPOINT + '/api/reset-password', data)
		  .subscribe(
		    (res) => {
		     	this.successMessage = res['successMessage'];
		     	this.resetting = res['resetting'];
	     		this.errorMessage = res['errorMessage']; 	
		    },
		    (err) => {
		      console.log('Erreur ! : ' + err);
		    }
		);    

	}//Eo onSubmitUpdatePassword()

}//Eo class
