import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";
import {AppSettings } from '../app.settings';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public httpClient: HttpClient,
  			      private formBuilder: FormBuilder,
  			      private router: Router,
              ) { }

  loginForm: FormGroup;

  errorMessage: string;
  

  ngOnInit(): void {
  	this.initForm();
  }//Eo ngOnInit()

  initForm(){
  	this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required]],
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }//Eo initForm()

  onSubmitLogin() {
  	const loginData = this.loginForm.value;
  	
  	this.httpClient.post(AppSettings.API_ENDPOINT + '/api/login', loginData)
  		.subscribe(
  	    (res) => {
    	    if (res['token']) {
    	        localStorage.setItem('token', res['token']);
    	        this.router.navigate(['user-account']);
  	      } else if (res['message']) {
              this.errorMessage = res['message'];
            }
    	  },
    	  (err) => {
  	    }
  	);  
  }//Eo onSubmitLogin()

}//Eo class
