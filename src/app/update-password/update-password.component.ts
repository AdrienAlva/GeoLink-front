import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePasswordForm: FormGroup;

  errorMessage: string;
  successMessage: string;

  constructor(private httpClient: HttpClient,
  			      private formBuilder: FormBuilder,
  			      private router: Router) { }

  ngOnInit(): void {
  	this.initForm();
  }//Eo ngOnInit()

  initForm(){
  	this.updatePasswordForm = this.formBuilder.group({
	  oldPassword: '',
      password: '',
      passwordConfirm: ''
    });
  }//Eo initForm()

  onSubmitUpdatePassword() {
    const data = this.updatePasswordForm.value;

    this.httpClient.post(AppSettings.API_ENDPOINT + '/api/update-password', data)
      .subscribe(
        (res) => {
         	this.errorMessage = res['message'];
         	this.successMessage = res['successMessage'];
        },
        (err) => {
          console.log('Erreur ! : ' + err);
        }
    );  
  }//Eo onSubmitUpdatePassword()

}//Eo class
