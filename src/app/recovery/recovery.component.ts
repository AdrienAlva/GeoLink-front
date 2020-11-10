import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  recoveryForm: FormGroup;

  errorMessage: string;
  successMessage: string;

  constructor(private httpClient: HttpClient,
  			  private formBuilder: FormBuilder,
  			  private router: Router) { }

  ngOnInit(): void {
  	this.initForm();
  }//Eo ngOnInit()

  initForm(){
  	this.recoveryForm = this.formBuilder.group({
      email: '',
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }//Eo initForm()

  onSubmitRecovery() {
    const data = this.recoveryForm.value;

    this.httpClient.post(AppSettings.API_ENDPOINT + '/recovery', data)
      .subscribe(
        (res) => {
          console.log(res)
          this.errorMessage = res['errorMessage'];
          this.successMessage = res['successMessage'];
          grecaptcha.reset();
        },
        (err) => {
          console.log('Erreur ! : ' + err);
        }
    );  
  }//Eo onSubmitRegisterAccount()

}//Eo class
