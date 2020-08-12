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
	members: Member[] = [];

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

	constructor(private membersService: MembersService) { }

	ngOnInit(): void {
		this.memberSubscription = this.membersService.membersSubject.subscribe( //pour remplir l'array local.
			(members: any) => {
				this.members.push(members);
			}
		);
		
		this.membersService.getMembers();
		this.membersService.emitMembers();

		console.log('OnInit :' + this.members);
		
	}//Eo ngOnInit()

	ngAfterViewInit(): void {
		this.createMap();// initialisation de la map.
		
	}//Eo ngAfterViewInit()

	createMap() {
		console.log('createMap')
		const univRennes2 = { // variable contenant les coordonnées utilisées pour définir le centre de la carte au chargement.
			lat: 48.118048,
			lng: -1.702823
		};

		const zoomLevel = 9; // niveau de zoom initial.

		this.map = L.map('map', { //Instance de l'objet map.
			center: [univRennes2.lat, univRennes2.lng],
			zoom: zoomLevel
		});

		const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  		minZoom: 4,
		  		maxZoom: 17,
		  		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  	});

		mainLayer.addTo(this.map); // methode pour ajouter les options de configuration de la carte. tileLayer / min-max zoom / attribution.

		console.log('create map member : ' + this.members);

		const emilien = 'Emilien Alvarez-Vanhard'

		const popupOption = { // objet pour params addMarker()
			coords: univRennes2,
			text: this.members.name,
			open: true  // booléen pour indiquer si le pop up doit être ouvert de base.
		};

		console.log(popupOption);

		this.addMarker(popupOption); // appel du marker.


	}//Eo createMap()

	addMarker({coords, text, open}) { // instance du marker.
		const marker = L.marker([coords.lat, coords.lng], {icon: this.smallIcon});
		if(open) {
			marker.addTo(this.map).bindPopup(text).openPopup(); // ajout du marker et du pop up à la map.
		} else {
			marker.addTo(this.map).bindPopup(text); // version où le pop up n'est pas ouvert au chargement.
		} 

		console.log('addmarker')
	}//Eo addMarker()
		

	ngOnDestroy() {
  		this.memberSubscription.unsubscribe();
  	}//Eo ngOnDestroy()


}//EO class
