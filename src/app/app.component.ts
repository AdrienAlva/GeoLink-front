import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	mySubscription;
  
	constructor(private router: Router, private activatedRoute: ActivatedRoute) {

		this.router.routeReuseStrategy.shouldReuseRoute = () => false; //permet de recharger la variable de l'user id pour la page profile.
    

	}//eo constructor

}//Eo class
