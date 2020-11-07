import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
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
    },{validator: this.passwordConfirming});
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
              this.router.navigate(['profil-type']);
          } else if (res['message']) {
              this.errorMessage = res['message'];
              grecaptcha.reset();
            }
        },
        (err) => {
          console.log('Erreur ! : ' + err);
        }
    );  
  }//Eo onSubmitRegisterAccount()

    passwordConfirming(c: AbstractControl): { invalid: boolean } {
      if (c.get('password').value !== c.get('passwordConfirm').value) {
          return {invalid: true};
      }
    }


}//Eo class
