import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/Member.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] =[]; //array local vide.
  membersSubject = new Subject<Member[]>(); // Subject pour diffuser l'array local.

  constructor(private httpClient: HttpClient) { }

  nodeRequest(){
    return this.httpClient.get('http://localhost:3000/verified-members');
  }

  emitMembers() { // pour emettre notre subject members au sein de l'appli.
  	this.membersSubject.next(this.members);
  }//Eo emitMembers()

  saveMembers() {
  	/*firebase.database().ref('/members').set(this.members);*/ // Set() fonctionne comme un 'put' en http.
  }//Eo saveMembers()

  getMembers() {
  	
      this.nodeRequest().subscribe((members: any) => {
        this.members = members;
        this.emitMembers();
      });
      
  		
  }//Eo getMembers()

  getSingleMembers(id: number) {
  	/*return new Promise(
  		(resolve, reject) => {
  			firebase.database().ref('/members/' + id).once('value').then( //once() n'effectue la requete qu'une seule fois.
  				(data) => {
  					resolve(data.val());
  				}, (error) => {
  					reject(error);
  				}
  			);
  		}
  	);*/
  }//Eo getSingleMembers()

}//Eo class
