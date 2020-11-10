import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/member.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {AppSettings } from '../app.settings';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] =[]; //array local vide.
  membersSubject = new Subject<Member[]>(); // Subject pour diffuser l'array local.

  constructor(private httpClient: HttpClient) { }

  nodeRequest(){
    console.log(AppSettings.API_ENDPOINT);
    return this.httpClient.get((AppSettings.API_ENDPOINT + '/verified-members'));
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

  getMembersNoEmit() {
    this.nodeRequest().subscribe((members: any) => {
      this.members = members;
    });     
  }//Eo getMembers()

}//Eo class
