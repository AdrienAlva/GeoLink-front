import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public httpClient: HttpClient,
  			  private formBuilder: FormBuilder,
  			  private router: Router) { }

  loginForm: FormGroup;
  

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
  	
	this.httpClient.post('http://localhost:3000/login', loginData)
		.subscribe(
		    (res) => {
		      console.log('Enregistrement du token !');
		      console.log(res);
		      if (res['token']) {
		        localStorage.setItem('token', res['token']);
		        this.router.navigate(['register-profile'])
		      }
		    },
		    (err) => {
		      console.log('Erreur ! : ' + err);
		    }
		);  
    }//Eo onSubmitLogin()

}//Eo class
