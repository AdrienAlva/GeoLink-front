import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {  
		const refToken = localStorage.getItem("token");
		const helper = new JwtHelperService();
		const isExpired = helper.isTokenExpired(refToken);

		if (refToken && !isExpired) {
		  return true;
		}

		this.router.navigate(['login']);
	}//Eo canActivate()

}//Eo class
