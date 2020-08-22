import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  constructor(public httpClient: HttpClient,
  			  private formBuilder: FormBuilder,
  			  private router: Router) { }

  registerAccountForm: FormGroup;
  

  ngOnInit(): void {
  	this.initForm();
  }//Eo ngOnInit()

  initForm(){
  	this.registerAccountForm = this.formBuilder.group({
      email: '',
      password: '',
      passwordConfirm: ''
    });
  }//Eo initForm()

  onSubmitRegisterAccount() {
    const registerAccountData = this.registerAccountForm.value;

    this.httpClient.post('http://localhost:3000/register-account', registerAccountData)
      .subscribe(
          (res) => {
            console.log('Requete d\'inscription !');
            console.log(res);
          },
          (err) => {
            console.log('Erreur ! : ' + err);
          }
      );  
    }//Eo onSubmitRegisterAccount()

}//Eo class
