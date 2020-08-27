import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private httpClient: HttpClient,
  			  private formBuilder: FormBuilder,
		      private router: Router) { }

  members: [];

  updateMemberForm: FormGroup;

  ngOnInit(): void {
  	
  	this.httpClient.get('http://localhost:3000/members-management').subscribe(
  		(data: any) => {
  			this.members = data;
  		}
  	);
  }//Eo ngOnInit()

  onSubmitVerifiedMember(form: NgForm){
  	console.log(form.value);

  	const data = form.value;
  	
  	/*this.httpClient.post('http://localhost:3000/validation', data)
  		.subscribe(
  	    (res) => {
    	    console.log('Envoi de la requête de validation de profil.');
    	    this.ngOnInit();
    	},
    	(err) => {
  	      console.log('Erreur ! : ' + err);
  	    }
  	);*/
  }//Eo onSubmitVerifiedMember()

  refuseMember(refusedEmail) {

    let jsonEmail = {email: ''};
    jsonEmail['email'] = refusedEmail;

    console.log(jsonEmail);

    /*this.httpClient.post('http://localhost:3000/refused', jsonEmail)
      .subscribe(
        (res) => {
          console.log('Envoi de la requête de validation de profil.');
          this.ngOnInit();
      },
      (err) => {
          console.log('Erreur ! : ' + err);
        }
    );*/
  }//Eo refused();

}//Eo class
