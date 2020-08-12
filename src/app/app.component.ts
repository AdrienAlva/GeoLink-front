import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
	constructor() {

		// Your web app's Firebase configuration
	    var firebaseConfig = {
		    apiKey: "AIzaSyAYzQ9Mjke2fwTEr7uVXpnFE265ra2eBFc",
		    authDomain: "geolink-94b0a.firebaseapp.com",
		    databaseURL: "https://geolink-94b0a.firebaseio.com",
		    projectId: "geolink-94b0a",
		    storageBucket: "geolink-94b0a.appspot.com",
		    messagingSenderId: "697746741104",
		    appId: "1:697746741104:web:e9d5c69cad5b9b5bfca1b5",
		    measurementId: "G-G5EGTKCPM8"
  		};

	    // Initialize Firebase
	    firebase.initializeApp(firebaseConfig);
	    firebase.analytics();

	}//eo constructor

}//Eo class
