import { Injectable } from '@angular/core';
import { Member } from '../models/Member.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase'; 
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  members: Member[] =[]; //array local vide.
  membersSubject = new Subject<Member[]>(); // Subject pour diffuser l'array local.

  constructor() { }

  emitMembers() { // pour emettre notre subject members au sein de l'appli.
  	
  	this.membersSubject.next(this.members);
  }//Eo emitMembers()

  saveMembers() {
  	firebase.database().ref('/members').set(this.members); // Set() fonctionne comme un 'put' en http.
  }//Eo saveMembers()

  getMembers() {
  	
  	firebase.database().ref('/members')
  		.on('value', (data) => {		//on() surveille en permanence et renvoie tout changement en BDD (?).
  			this.members = data.val() ? data.val() : [];
  			this.emitMembers();
  			
  			/*console.log(this.members.category[0]);*/
  		});
  }//Eo getMembers()

  getSingleMembers(id: number) {
  	return new Promise(
  		(resolve, reject) => {
  			firebase.database().ref('/members/' + id).once('value').then( //once() n'effectue la requete qu'une seule fois.
  				(data) => {
  					resolve(data.val());
  				}, (error) => {
  					reject(error);
  				}
  			);
  		}
  	);
  }//Eo getSingleMembers()

}//Eo class
