import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  registerAccountForm: FormGroup;

  errorMessage: string;

  constructor(private httpClient: HttpClient,
  			      private formBuilder: FormBuilder,
  			      private router: Router) { }

  ngOnInit(): void {
  	this.initForm();
  }//Eo ngOnInit()

  initForm(){
  	this.registerAccountForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[ Validators.required, Validators.minLength(8)]], 
      passwordConfirm: ['',[ Validators.required, Validators.minLength(8)]],
      recaptchaReactive: new FormControl(null, Validators.required)
    });
  }//Eo initForm()

  get f() { return this.registerAccountForm.controls; }

  onSubmitRegisterAccount() {
    const registerAccountData = this.registerAccountForm.value;

    this.httpClient.post('http://localhost:3000/register-account', registerAccountData)
      .subscribe(
        (res) => {
          console.log('Enregistrement du token !');
          console.log(res);
          if (res['token']) {
              localStorage.setItem('token', res['token']);
              this.router.navigate(['register-profile']);
          } else if (res['message']) {
              this.errorMessage = res['message'];
            }
        },
        (err) => {
          console.log('Erreur ! : ' + err);
        }
    );  
  }//Eo onSubmitRegisterAccount()

  resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
  }//Eo resolved()

}//Eo class
