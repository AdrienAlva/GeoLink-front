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
  }//Eo nodeRequest()

  emitMembers() { // pour emettre notre subject members au sein de l'appli.
  	this.membersSubject.next(this.members);
  }//Eo emitMembers()

  getMembers() {
    this.nodeRequest().subscribe((members: any) => {
      this.members = members;
      this.emitMembers();
    }); 		
  }//Eo getMembers()

}//Eo class
