import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  recoveryForm: FormGroup;

  errorMessage: string;

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

    this.httpClient.post('http://localhost:3000/recovery', data)
      .subscribe(
        (res) => {
          this.errorMessage = res['message'];
        },
        (err) => {
          console.log('Erreur ! : ' + err);
        }
    );  
  }//Eo onSubmitRegisterAccount()

  resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
  }//Eo resolved();
}//Eo class
