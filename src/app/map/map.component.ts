import { Component, AfterViewInit } from '@angular/core'; 
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit { // AfterViewInit permet d'atttendre que le DOM soit chargé avant d'agir. 

	map; // variable pour stocker la map.

	smallIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		shadowSize:  [41, 41]
	});

	constructor() { }

	ngAfterViewInit(): void {
		this.createMap();
	}//Eo ngAfterViewInit()

	createMap() {
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

		var data = [
		{"loc":[48.118048,-1.702823], "title":"Emilien", "category":"drone emilien"},
		{"loc":[41.575730,13.002411], "title":"Adrien", "category":"Satellite"},
		{"loc":[41.807149,13.162994], "title":"Yoan", "category":"drone"},
		];

		const emilien = 'Emilien Alvarez-Vanhard'

		const popupOption = { // objet pour params addMarker()
			coords: univRennes2,
			text: emilien,
			open: true  // booléen pour indiquer si le pop up doit être ouvert de base.
		};

		this.addMarker(popupOption); // appel du marker.


	}//Eo createMap()

	addMarker({coords, text, open}) { // instance du marker.
		const marker = L.marker([coords.lat, coords.lng], {icon: this.smallIcon});
		if(open) {
			marker.addTo(this.map).bindPopup(text).openPopup(); // ajout du marker et du pop up à la map.
		} else {
			marker.addTo(this.map).bindPopup(text); // version où le pop up n'est pas ouvert au chargement.
		} 
	}//Eo addMarker()
		

}//EO class
