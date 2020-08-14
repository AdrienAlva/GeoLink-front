import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core'; 
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy { // AfterViewInit permet d'atttendre que le DOM soit chargé avant d'agir. 

	map; // variable pour stocker la map.
	members: string;

	cartographe = L.layerGroup();
	droneCat = L.layerGroup();

	memberSubscription: Subscription;

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



	constructor(private membersService: MembersService) { 
		
	}

	ngOnInit(): void {
		/*this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: any[]) => {
	  			this.members = members;
	  		}
  		);*/

		this.membersService.getMembers();
		this.membersService.emitMembers();

		let currentMember = this.membersService.membersSubject.asObservable();

		this.membersService.membersSubject.subscribe(val => this.addMarker(val));
	
	}//Eo ngOnInit()


	ngAfterViewInit(): void {
		this.createMap();// initialisation de la map.
		this.makeLayerCarto();
		
	}//Eo ngAfterViewInit()

	createMap() {
		console.log('createMap')
		const univRennes2 = { // variable contenant les coordonnées utilisées pour définir le centre de la carte au chargement.
			lat: 48.118048,
			lng: -1.702823
		};

		const zoomLevel = 5; // niveau de zoom initial.

		this.map = L.map('map', { //Instance de l'objet map.
			center: [univRennes2.lat, univRennes2.lng],
			zoom: zoomLevel,
			layers: [this.cartographe]
		});

		const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  		minZoom: 4,
		  		maxZoom: 17,
		  		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  	});

		mainLayer.addTo(this.map); // methode pour ajouter les options de configuration de la carte. tileLayer / min-max zoom / attribution.

	}//Eo createMap()

	addMarker(val) { // instance du marker.

		const obj = Object.create(val);
		

		for ( let member of obj) {
			const open = false;
			const name: string = member.name; 
			const lat: number = member.lat;
			const lng: number = member.lng;
			const cat1 = member.category[0];
			const cat2 = member.category[1];

			

			console.log(cat1);
			
			if(cat1 == 'dronistique' || cat2 == 'dronistique'){
				const markerDrone = L.marker([lat, lng], {icon: this.smallIcon});
					
				markerDrone.addTo(this.map).bindPopup(name).addTo(this.droneCat); // version où le pop up n'est pas ouvert au chargement.		 	
			}

			if (cat1 == 'cartographie' || cat2 == 'cartographie') {
				
				const markerCarto = L.marker([lat, lng], {icon: this.smallIcon});
					
				markerCarto.addTo(this.map).bindPopup(name).addTo(this.cartographe); // version où le pop up n'est pas ouvert au chargement.			
				
			}//Eo else if
		}//Eo for

		
	
	}//Eo addMarker()

	makeLayerCarto() {

		this.map.addLayer(this.cartographe);// pour que les categories soit "checked" dans le control de filtre des layers.
		this.map.addLayer(this.droneCat);

		var overlays = {
			"Cartographes": this.cartographe,
			"Dronistique": this.droneCat 
		};

		console.log(this.map);
		L.control.layers(this.map.mainLayer, overlays).addTo(this.map);
	}
		


	ngOnDestroy() {
  		this.memberSubscription.unsubscribe();
  	}//Eo ngOnDestroy()


}//EO class
