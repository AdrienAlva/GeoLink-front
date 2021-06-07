import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';


@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  constructor(private httpClient: HttpClient,
  			  private formBuilder: FormBuilder,
		      private router: Router) { }

  membersToVerify: [];

  verifiedForm: FormGroup;

  apiRoute: string = AppSettings.API_ENDPOINT;

  ngOnInit(): void {
  	
  	this.httpClient.get(AppSettings.API_ENDPOINT + '/api/members-validation').subscribe(
  		(data: any) => {
  			this.membersToVerify = data;
  		}
  	);
  }//Eo ngOnInit()

  onSubmitVerifiedMember(form: NgForm){

  	const data = form.value;
  	
  	this.httpClient.post(AppSettings.API_ENDPOINT + '/api/validation', data)
  		.subscribe(
  	    (res) => {
    	    this.ngOnInit();
    	},
    	(err) => {}
  	);

    if(data.refusedAvatar == "true") {

      let jsonEmail = {email: '', avatar: ''};
      jsonEmail['email'] = data.email;
      jsonEmail['avatar'] = data.avatarValue;

      this.httpClient.post(AppSettings.API_ENDPOINT + '/api/delete-avatar', jsonEmail)
      .subscribe(
        (res) => {
          this.ngOnInit();
        },
        (err) => {}
      );
    }//Eo if
  }//Eo onSubmitVerifiedMember()

  onRefuseMember(refusedEmail) {

    let jsonEmail = {email: ''};
    jsonEmail['email'] = refusedEmail;

    this.httpClient.post(AppSettings.API_ENDPOINT + '/api/refused', jsonEmail)
      .subscribe(
        (res) => {
          this.ngOnInit();
      },
      (err) => {}
    );

  }//Eo refused();

}//Eo class
