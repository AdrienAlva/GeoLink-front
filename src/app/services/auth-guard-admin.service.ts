import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {

  isad: boolean = false;

  	constructor(private router: Router, private httpClient: HttpClient) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {  
		const refToken = localStorage.getItem("token");
		console.log('local token: ' + refToken);
		const helper = new JwtHelperService();
		const isExpired = helper.isTokenExpired(refToken);

		return this.httpClient.get('http://localhost:3000/admin-login').map((res)=>{
			if(res['value'] == 'true'){
				this.isad = true;
				if (refToken && !isExpired && this.isad) {
					console.log('On rentre ! ')
		  			return true;
				} 
			}

  			this.router.navigate(['login']);
  			return false;
		});//Eo return http call	
	}//Eo canActivate()
}//Eo class
