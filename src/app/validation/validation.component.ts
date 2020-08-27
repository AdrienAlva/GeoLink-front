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

  membersToVerified: [];

  verifiedForm: FormGroup;

  ngOnInit(): void {
  	
  	this.httpClient.get('http://localhost:3000/members').subscribe(
  		(data: any) => {
  			this.membersToVerified = data;
  			console.log(this.membersToVerified);
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
  }//Eo onSubmitVerifiedMember()

  refused(refusedEmail) {

    let jsonEmail = {email: ''};
    jsonEmail['email'] = refusedEmail;

    console.log(jsonEmail);

    this.httpClient.post('http://localhost:3000/refused', jsonEmail)
      .subscribe(
        (res) => {
          console.log('Envoi de la requête de validation de profil.');
          this.ngOnInit();
      },
      (err) => {
          console.log('Erreur ! : ' + err);
        }
    );
  }//Eo refused();

}//Eo class
