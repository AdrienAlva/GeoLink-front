import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '../models/member.model';
import { map } from 'rxjs/Operators';
import {AppSettings } from '../app.settings';
import * as L from 'leaflet';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.component.html',
  styleUrls: ['./register-profile.component.css']
})
export class RegisterProfileComponent implements OnInit {

	registerProfileForm: FormGroup;

	email: any;

	map;

	/*Display boolean*/
	formerStudentInput: boolean = false;
	/*END*/

	memberIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: '../assets/icons/member.png',
		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
		iconSize:    [35, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
	});

	constructor(private httpClient: HttpClient,
			  	private formBuilder: FormBuilder,
			  	private router: Router) { }

	ngOnInit(): void {
		
		this.initForm();

	}//Eo ngOnInit()

	initForm(){

		this.registerProfileForm = this.formBuilder.group({
	  		surname: '',
	  		name: '',
	  		status: '',
	  		lat: null,
	  		lng: null,
	  		thematic1: '',
	  		thematic2: '',
	  		thematic3: '',
	  		thematic4: '',
	  		thematic5: '',
	  		about: '',
	  		emailToDisplay: '',
	  		site: '',
	  		former:'',
	  		avatar: ['']
		});

		this.httpClient.get(AppSettings.API_ENDPOINT + '/api/user-account')
			.subscribe(
			    (res: any) => {
			    	
			    	this.email = JSON.stringify(res, ['email']).replace('[{"email":"', '').replace('"}]', '');
			    	
			    	this.registerProfileForm.patchValue({emailToDisplay: this.email});// patch value to update registerProfileForm after his init.

					this.createMap();

					let layerGroup = L.layerGroup().addTo(this.map);

					this.map.on("click", e => { 
			      		
			        	layerGroup.clearLayers(); 
			    		
			    		let myMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: this.memberIcon}).addTo(layerGroup);
			    		this.map.addLayer(layerGroup);

			    		this.registerProfileForm.controls['lat'].setValue(e.latlng.lat);
			    		this.registerProfileForm.controls['lng'].setValue(e.latlng.lng);
	    			});

			    },
			    (err) => {
			    }    
			);

	}//Eo initForm()

	onSubmitRegisterProfile() {

	  	const registerData = this.registerProfileForm.value;

	  	
	  	var res = confirm("Êtes-vous sûr des informations renseignées ?");
		if(res){
			this.httpClient.post(AppSettings.API_ENDPOINT + '/api/register-profile', registerData)
			.subscribe(
			    (res) => {
			    },
			    (err) => {
			    }    
			);
			this.router.navigate(['sent-request']);
		}

    	const formData = new FormData();
    	formData.append('avatar', this.registerProfileForm.get('avatar').value); 	

    	this.httpClient.post(AppSettings.API_ENDPOINT + '/api/upload-avatar', formData).subscribe();//req for avatar upload
    }//Eo onSubmitRegisterProfile()

  	onFileSelect(event) { 
	    if (event.target.files.length > 0) {
	      const file = event.target.files[0];
	      this.registerProfileForm.get('avatar').setValue(file);
	    }
  	}//Eo onFileSelect() - on adding avatar file. Bind it to the FormGroup.

  	onClickStatus(status){
  		if(status == 'Etudiant du master TELENVI' || status == '') {
  			this.formerStudentInput = false;
  		} else {
  			this.formerStudentInput = true;
  		}
  	}//Eo onClickStatus()

	createMap() {

		const univRennes2 = { // variable contenant les coordonnées utilisées pour définir le centre de la carte au chargement.
			lat: 48.118048,
			lng: -1.702823
		};

		const zoomLevel = 3; // niveau de zoom initial.

		this.map = L.map('map', { //Instance de l'objet map.
			center: [univRennes2.lat, univRennes2.lng],
			zoom: zoomLevel,
		});

		const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  		minZoom: 3,
		  		maxZoom: 18,
		  		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		  		noWrap: true
		  	});

		mainLayer.addTo(this.map); // methode pour ajouter les options de configuration de la carte. tileLayer / min-max zoom / attribution.
	}//Eo createMap()

}//Eo class
