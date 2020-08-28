import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }//Eo ngOnInit()

  onLogout() {
		localStorage.removeItem('token');

		this.router.navigate(['/']);
	}//Eo onLogout()

}//Eo class
