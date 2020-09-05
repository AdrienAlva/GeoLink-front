import { Injectable } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor() { }

	isConnected() {
		let isConnected = localStorage.getItem('token');
		return isConnected;
	}//eo isConnected

	isExpired() {
		let refToken = localStorage.getItem("token");
		let helper = new JwtHelperService();
		let isExpired = helper.isTokenExpired(refToken);
		return isExpired;
	}


}//Eo class
