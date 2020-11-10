import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AppSettings } from '../app.settings';

@Component({
  selector: 'app-avatar-update',
  templateUrl: './avatar-update.component.html',
  styleUrls: ['./avatar-update.component.css']
})
export class AvatarUpdateComponent implements OnInit {

	formDataForm: FormGroup;

	successMessage: string;

	constructor(private httpClient: HttpClient,
	  		  private formBuilder: FormBuilder,
		  	  private router: Router) { }

	ngOnInit(): void {
		this.initForm();
	}//Eo ngOnInit

	initForm(){
		this.formDataForm = this.formBuilder.group({
	  		avatar: ['']
		});
	}//Eo initForm()

	onSubmitRegisterProfile() {

    	const formData = new FormData();
    	formData.append('avatar', this.formDataForm.get('avatar').value); 	

		console.log(formData);

    	this.httpClient.post(AppSettings.API_ENDPOINT + '/api/upload-avatar', formData).subscribe(
      		(res) => this.successMessage = res['message'],
      		(err) => console.log(err)
    	);//req for avatar upload
    }//Eo onSubmitRegisterProfile()

  	onFileSelect(event) { 
  		console.log("onFileSelect()");
	    if (event.target.files.length > 0) {
	      const file = event.target.files[0];
	      this.formDataForm.get('avatar').setValue(file);
	    }
  	}//Eo onFileSelect() - on adding avatar file. Bind it to the FormGroup.

}//Eo class
