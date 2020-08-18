import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) { //Créer un utilisateur via firebase.
  	return new Promise(
  		(resolve, reject) => {
  			firebase.auth().createUserWithEmailAndPassword(email, password).then(
  				() => {
  					resolve();
  				},
  				(error) => {
  					reject(error);
  				}
  			);
  		}
  	);
  }//Eo createNewUser()

  signInUser(email: string, password: string) { //log un utilisateur via firebase.
  	return new Promise(
  		(resolve, reject) => {
  			firebase.auth().signInWithEmailAndPassword(email, password).then(
  				() => {
  					resolve();
  				},
  				(error) => {
  					reject(error);
  				}
  			);
  		}
  	);
  }//Eo signInUser

  signOutUser() { // unlog un utilisateur via firebase.
  	firebase.auth().signOut();
  }//Eo signOutUser()

}//Eo AuthService class
