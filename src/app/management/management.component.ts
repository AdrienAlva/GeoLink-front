import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  members: [];

  updateMemberForm: FormGroup;

  apiRoute: string = AppSettings.API_ENDPOINT;

  constructor(private httpClient: HttpClient,
  			      private formBuilder: FormBuilder,
		          private router: Router) { }

  ngOnInit(): void {
  	
  	this.httpClient.get(AppSettings.API_ENDPOINT + '/members-management').subscribe(
  		(data: any) => {
  			this.members = data;
  		}
  	);
  }//Eo ngOnInit()

  onUpdateMember(form: NgForm){
  	console.log(form.value);

  	const data = form.value;

  	var res = confirm("Êtes-vous sûr de vouloir modifier les données du compte dont l'adresse email associée est : " + data.email + " ?");
    if(res){
        this.httpClient.post(AppSettings.API_ENDPOINT + '/update', data)
	  		.subscribe(
	  	    (res) => {
	    	    console.log('Envoi de la requête de modification de profil.');
	    	    this.ngOnInit();
	    	},
	    	(err) => {
	  	      console.log('Erreur ! : ' + err);
	  	    }
  		);
    } 

    if(data.refusedAvatar == "true") {

      let jsonEmail = {email: '', avatar: ''};
      jsonEmail['email'] = data.email;
      jsonEmail['avatar'] = data.avatarValue;

      this.httpClient.post(AppSettings.API_ENDPOINT + '/delete-avatar', jsonEmail)
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

  onDeleteMember(accountEmail, avatar) {

    let jsonEmail = {email: '', avatar: ''};
    jsonEmail['email'] = accountEmail;
    jsonEmail['avatar'] = avatar;

    console.log(jsonEmail);

    var res = confirm("Êtes-vous sûr de vouloir supprimer le compte dont l'adresse email associée est : " + accountEmail + " ?");
    if(res){
        this.httpClient.post(AppSettings.API_ENDPOINT + '/delete', jsonEmail)
      	.subscribe(
	        (res) => {
	          console.log('Envoi de la requête de suppression du compte.');
	          this.ngOnInit();
	      	},
	      	(err) => {
	          console.log('Erreur ! : ' + err);
	        }
    	);
    } else {
    	alert('Vous avez annulé la demande de suppression du compte.')
    }

    
  }//Eo onDeleteMember();

}//Eo class
