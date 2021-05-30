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

	errorMessage: string;

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

    	this.httpClient.post(AppSettings.API_ENDPOINT + '/api/upload-avatar', formData).subscribe(
      		(res) => this.successMessage = res['message'],
    	);//req for avatar upload
    }//Eo onSubmitRegisterProfile()

  	onFileSelect(event) { 

	    if (event.target.files.length > 0) {	

	    	this.successMessage = "";

      		const file = event.target.files[0];

      		if (file.size > 1572864) {
      			this.errorMessage = "La taille du fichier est trop importante !"
      			return;
      		}

      		this.errorMessage = "";
      		this.formDataForm.get('avatar').setValue(file);
	    }
  	}//Eo onFileSelect() - on adding avatar file. Bind it to the FormGroup.


}//Eo class
