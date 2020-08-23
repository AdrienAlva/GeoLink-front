import { Component, OnInit, AfterViewInit, OnDestroy, NgZone, ElementRef } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import * as L from 'leaflet';
import * as Category from './category.constants';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy { // AfterViewInit permet d'atttendre que le DOM soit chargé avant d'agir. 

	memberSubscription: Subscription;

	map; // variable pour stocker la map.
	members: Member[] = [];

	cartographe = L.layerGroup();
	droneCat = L.layerGroup();
	programmeurJS = L.layerGroup();

	layersArray = [ this.cartographe, this.droneCat, this.programmeurJS];

	selectedCategory: string = null; // Etat courant de la selection de category. Null = all categories.

	smallIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		shadowSize:  [41, 41]
	});

	greenIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: '../assets/icons/cramschool.png',
		iconSize:    [35, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34]
	});


	constructor(private membersService: MembersService,
				private router: Router) { 
		
	}

	ngOnInit(): void {
		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => this.onMembersLoading(members)
  		);

		this.membersService.getMembers();

		/*let currentMember = this.membersService.membersSubject.asObservable();

		this.membersService.membersSubject.subscribe(val => this.addMarker(val));*/
		this.createMap();// initialisation de la map.
		this.makeLayerCarto();
	
	}//Eo ngOnInit()


	ngAfterViewInit(): void {
		
		
	}//Eo ngAfterViewInit()


	onMembersLoading(members: Member[]){
		this.members = members;
		this.addMarker(this.members);
	}//Eo onMembersLoading()

	createMap() {
		console.log('createMap')

		const univRennes2 = { // variable contenant les coordonnées utilisées pour définir le centre de la carte au chargement.
			lat: 48.118048,
			lng: -1.702823
		};

		const zoomLevel = 2; // niveau de zoom initial.

		this.map = L.map('map', { //Instance de l'objet map.
			center: [univRennes2.lat, univRennes2.lng],
			zoom: zoomLevel,
			layers: [this.cartographe]
		});

		const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  		minZoom: 3,
		  		maxZoom: 18,
		  		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  	});

		mainLayer.addTo(this.map); // methode pour ajouter les options de configuration de la carte. tileLayer / min-max zoom / attribution.
		
		
	}//Eo createMap()

	addMarker(members: Member[]) { // instance du marker.

		for ( let member of members) {
			const name: string = member.name; 
			const lat: number = member.lat;
			const lng: number = member.lng;
			const cat1 = member.category[0];
			const cat2 = member.category[1];

			let index = members.indexOf(member);
			
			if(cat1 == 'dronistique' || cat2 == 'dronistique'){
				const markerDrone = L.marker([lat, lng], {icon: this.smallIcon});
					
				let profileLink = "routerLink=''"

				markerDrone.addTo(this.map).bindPopup(name + " " + member.surname 
													  + "<br>" + member.status
													  + "<br><a id='test' href='/member/profile/" + index + "'>Voir mon profil...</a>"
													  ).addTo(this.droneCat); 		 	
			}//Eo if

			if (cat1 == 'cartographie' || cat2 == 'cartographie') {
				
				const markerCarto = L.marker([lat, lng], {icon: this.smallIcon});
					
				markerCarto.addTo(this.map).bindPopup(name + ' ' + member.surname + '<br>' + member.status + "<br><a id='test' href='/member/profile/" + index + "'>Voir mon profil...</a>").addTo(this.cartographe);
			}//Eo if

			if (cat1 == 'javascript' || cat2 == 'javascript') {
				
				const markerJS = L.marker([lat, lng], {icon: this.smallIcon});
					
				markerJS.addTo(this.map).bindPopup(name + ' ' + member.surname + '<br>' + member.status + "<br><a id='test' href='/member/profile/" + index + "'>Voir mon profil...</a>").addTo(this.programmeurJS);
			}//Eo if
		}//Eo for
	}//Eo addMarker()

	makeLayerCarto() {

		this.map.addLayer(this.cartographe);// pour que les categories soit "checked" dans le control de filtre des layers.
		this.map.addLayer(this.droneCat);
		this.map.addLayer(this.programmeurJS);

		var overlays = {
			"Cartographes": this.cartographe,
			"Dronistique": this.droneCat,
			"Javascript" : this.programmeurJS
		};

		L.control.layers(this.map.mainLayer, overlays).addTo(this.map);
	}//Eo makeLayerCarto

	/* clickable events */

	onSetCartographie() {
		this.map.addLayer(this.cartographe);
		this.map.removeLayer(this.droneCat);
		this.map.removeLayer(this.programmeurJS);

		this.selectedCategory = Category.CATEGORY_CARTOGRAPHIE;
	}

	onSetDronistique() {
		this.map.addLayer(this.droneCat);
		this.map.removeLayer(this.cartographe);
		this.map.removeLayer(this.programmeurJS);

		this.selectedCategory = Category.CATEGORY_DRONISTIQUE;
	}

	onSetJavascript() {
		this.map.addLayer(this.programmeurJS);
		this.map.removeLayer(this.cartographe);
		this.map.removeLayer(this.droneCat);

		this.selectedCategory = Category.CATEGORY_JAVASCRIPT;
	}



	onDisplayAll() {
		this.map.addLayer(this.cartographe);
		this.map.addLayer( this.droneCat);
		this.map.addLayer(this.programmeurJS);

		this.selectedCategory = null;
	}//Eo onDisplayAll()


	onNavigateToLogin() {
		this.router.navigate(['login']);
	}//onNavigateToLogin()

	onNavigateToRegisterAccount() {
		this.router.navigate(['register-account']);
	}//onNavigateToRegisterAccount()

	

	ngOnDestroy() {
  		this.memberSubscription.unsubscribe();
  	}//Eo ngOnDestroy()

}//EO class
