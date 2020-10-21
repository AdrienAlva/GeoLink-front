import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
	  		password: '',
	  		passwordConfirm: '',
	  		token: this.tokenParam
		});
	}//Eo initForm()

	onSubmitUpdatePassword() {
		const data = this.updatePasswordForm.value;

		this.httpClient.post('http://localhost:3000/reset-password', data)
		  .subscribe(
		    (res) => {
		     	this.errorMessage = res['errorMessage'];
		     	this.successMessage = res['successMessage'];
		     	this.resetting = res['resetting'];
		    },
		    (err) => {
		      console.log('Erreur ! : ' + err);
		    }
		);    

	}//Eo onSubmitUpdatePassword()

}//Eo class
