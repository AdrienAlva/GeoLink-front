import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
	
	members;

	constructor(private httpClient: HttpClient,
	      		private formBuilder: FormBuilder,
	      		private router: Router) { }

	ngOnInit(): void {
		this.httpClient.get('http://localhost:3000/user-account').subscribe(
			(data: any) => {
				this.members = data;
				console.log(this.members);
			}
		);
	}//Eo ngOnInit()

	onLogout() {
		localStorage.removeItem('token');

		this.router.navigate(['/']);
	}//Eo onLogout()

}//Eo class
