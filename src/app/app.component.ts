import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) {

		this.router.routeReuseStrategy.shouldReuseRoute = () => false; //permet de recharger la variable de l'user id pour la page profile.

	}//eo constructor

	ngOnInit(): void {}

	onLogout() {
		localStorage.removeItem('token');
	}//Eo onLogout()

}//Eo class
