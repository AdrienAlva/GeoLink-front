import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(public httpClient: HttpClient,
  			  private formBuilder: FormBuilder,
  			  private router: Router) { }

  loginForm: FormGroup;

  errorMessage: string;
  

  ngOnInit(): void {
  	this.initForm();
  }//Eo ngOnInit()

  initForm(){
  	this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }//Eo initForm()

  onSubmitLogin() {
  	const loginData = this.loginForm.value;
  	
  	this.httpClient.post(AppSettings.API_ENDPOINT + '/api/admin-login', loginData)
  		.subscribe(
  	    (res) => {
    	    if (res['token']) {
    	        localStorage.setItem('token', res['token']);
    	        this.router.navigate(['admin-panel']);
  	      } else if (res['message']) {
              this.errorMessage = res['message'];
            }
    	  },
    	  (err) => {
  	    }
  	);  
  }//Eo onSubmitLogin()

}//Eo class
