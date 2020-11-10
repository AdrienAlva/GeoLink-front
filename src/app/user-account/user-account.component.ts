import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';
import { AuthInterceptorService } from '../services/auth-interceptor.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
	
	members;

	constructor(private httpClient: HttpClient,
	      		private formBuilder: FormBuilder,
	      		private router: Router,
	      		private authInterceptorService: AuthInterceptorService) { }

	ngOnInit(): void {

		this.authInterceptorService.intercept;

		this.httpClient.get(AppSettings.API_ENDPOINT + '/user-account-node').subscribe(
			(data: any) => {
				this.members = data;
			}
		);
	}//Eo ngOnInit()

}//Eo class
