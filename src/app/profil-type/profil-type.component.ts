import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-type',
  templateUrl: './profil-type.component.html',
  styleUrls: ['./profil-type.component.css']
})
export class ProfilTypeComponent implements OnInit {

  constructor(private httpClient: HttpClient,
      		  private formBuilder: FormBuilder,
		      private router: Router) { }

  ngOnInit(): void {
  }//Eo ngOnInit()

  onSubmitRadio(form: NgForm) {
  	let data = form.value;

  	if(data.choice == "personnal"){
  		this.router.navigate(['register-profile']);
  	} else if( data.choice == "organization") {
  		this.router.navigate(['register-profile-organization']);
  	}
  }//Eo onSubmitRadio()

}//Eo class
