import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


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

  ngOnInit(): void {
  	
  	this.httpClient.get('http://localhost:3000/members-validation').subscribe(
  		(data: any) => {
  			this.membersToVerify = data;
  			console.log(this.membersToVerify);
  		}
  	);
  }//Eo ngOnInit()

  onSubmitVerifiedMember(form: NgForm){
  	console.log(form.value);

  	const data = form.value;
  	
  	this.httpClient.post('http://localhost:3000/validation', data)
  		.subscribe(
  	    (res) => {
    	    console.log('Envoi de la requête de validation de profil.');
    	    this.ngOnInit();
    	},
    	(err) => {
  	      console.log('Erreur ! : ' + err);
  	    }
  	);

    if(data.refusedAvatar == "true") {
      console.log('refused avatar...');

      let jsonEmail = {email: '', avatar: ''};
      jsonEmail['email'] = data.email;
      jsonEmail['avatar'] = data.avatarValue;

      this.httpClient.post('http://localhost:3000/delete-avatar', jsonEmail)
        .subscribe(
          (res) => {
            console.log('Envoi de suppression d\'avatar.');
            this.ngOnInit();
        },
        (err) => {
            console.log('Erreur ! : ' + err);
          }
      );
    }//Eo if
  }//Eo onSubmitVerifiedMember()

  onRefuseMember(refusedEmail) {

    let jsonEmail = {email: ''};
    jsonEmail['email'] = refusedEmail;

    this.httpClient.post('http://localhost:3000/refused', jsonEmail)
      .subscribe(
        (res) => {
          console.log('Envoi de la requête de refus de profil.');
          this.ngOnInit();
      },
      (err) => {
          console.log('Erreur ! : ' + err);
        }
    );

  }//Eo refused();

}//Eo class
