import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  	return new Promise(
  		(resolve, reject) => {
  			firebase.auth().onAuthStateChanged(
  				(user) => {
  					if(user) {
  						resolve(true);
  					} else {
  						this.router.navigate(['/auth', 'signin']); // Attention à la synthaxe ici pour définir l'adresse de la redirection. On ne met pas des '/' entre les sous-domaines mais des ','. 
  						resolve(false);
  					}
  				}
  			);
  		}
  	);
  }//Eo canActivate()

}//Eo class
