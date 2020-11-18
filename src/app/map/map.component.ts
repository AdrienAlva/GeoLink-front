import { Component, OnInit, OnDestroy, NgZone, ElementRef, AfterViewInit } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../models/member.model';
import { MembersService } from '../services/members.service';
import { MemberToDisplayService } from '../services/member-to-display.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { NgElement, WithProperties } from '@angular/elements';
import { LeafletPopupComponent } from '../leaflet-popup/leaflet-popup.component';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy { 

	memberSubscription: Subscription;
	members: Member[] = [];

	map; // variable pour stocker la map.

	allMembers = L.layerGroup();

	/* Map Icons */
	memberIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: '../assets/icons/member.png',
		iconSize:    [35, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
	});

	organizationIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: '../assets/icons/organization.png',
		iconSize:    [35, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34]
	});

	markers = L.markerClusterGroup({
		spiderfyOnMaxZoom: false,
		showCoverageOnHover: false
	});

	selectOptionsStatus: FormControl = new FormControl('all');
	selectOptionsThematic: FormControl = new FormControl('all');

	/* CONSTRUCTOR */
	constructor(private membersService: MembersService,
				private memberToDisplay: MemberToDisplayService,
				private router: Router) { }

	/* ON INIT */
	ngOnInit(): void {
		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => {
	  			this.markers.clearLayers();

				this.onMembersLoading(members);

				this.makeLayerCarto();

				this.map.addLayer(this.markers);
			});

		this.membersService.getMembers();

		this.createMap();

		this.memberToDisplay.status = 'all';
		this.memberToDisplay.thematic = 'all';

	}//Eo ngOnInit()

	onMembersLoading(members: Member[]){
		this.members = members;
		this.addMarkerOnInit(this.members);
	}//Eo onMembersLoading()

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

		const mainLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
		  		minZoom: 2,
		  		maxZoom: 18,
		  		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'	  		
		  	});

		mainLayer.addTo(this.map); // methode pour ajouter les options de configuration de la carte. tileLayer / min-max zoom / attribution.
	}//Eo createMap()


	thematicToDisplay = "all";
	statusToDisplay = "all";

	currentLayer = L.layerGroup();
	
	addMarkerOnClick(status) {

		this.statusToDisplay = status;

		if(this.thematicToDisplay == 'all' && this.statusToDisplay == 'all') {

			this.memberToDisplay.status = this.statusToDisplay;
			this.memberToDisplay.thematic = this.thematicToDisplay;

			this.memberToDisplay.filterByCategory(this.members);

			this.currentLayer.clearLayers();

			for (let member of this.members) {

				let index = this.members.indexOf(member);

				this.addMemberPopupToLayer(member, index, this.currentLayer);
				
			}//Eo for

			this.markers.clearLayers();

			this.currentLayer.addTo(this.markers);
			
		} else if(this.thematicToDisplay == 'all' && this.statusToDisplay != 'all') {

			this.memberToDisplay.status = this.statusToDisplay;
			this.memberToDisplay.thematic = this.thematicToDisplay;

			this.memberToDisplay.filterByCategory(this.members);

			this.currentLayer.clearLayers();


			for (let member of this.members) {

				let index = this.members.indexOf(member);

				if(member.status.indexOf(status) > -1){
					this.addMemberPopupToLayer(member, index, this.currentLayer);
				}//Eo if
	
			}//Eo for

			this.markers.clearLayers();

			this.currentLayer.addTo(this.markers);
			
		} else if(this.thematicToDisplay != 'all' && this.statusToDisplay == 'all') {

			this.memberToDisplay.status = this.statusToDisplay;
			this.memberToDisplay.thematic = this.thematicToDisplay;

			this.memberToDisplay.filterByCategory(this.members);

			this.currentLayer.clearLayers();

			for (let member of this.members) {

				let index = this.members.indexOf(member);

				if(member.thematics.indexOf(this.thematicToDisplay) > -1){
					this.addMemberPopupToLayer(member, index, this.currentLayer);
				}//Eo if
	
			}//Eo for

			this.markers.clearLayers();

			this.currentLayer.addTo(this.markers);
			
		} else if (this.thematicToDisplay != 'all' && this.statusToDisplay != 'all'){

			this.memberToDisplay.status = this.statusToDisplay;
			this.memberToDisplay.thematic = this.thematicToDisplay;

			this.memberToDisplay.filterByCategory(this.members);

			this.currentLayer.clearLayers();

			for (let member of this.members) {

				let index = this.members.indexOf(member);

				if(member.status.indexOf(this.statusToDisplay) > -1 && member.thematics.indexOf(this.thematicToDisplay) > -1){
					this.addMemberPopupToLayer(member, index, this.currentLayer);
				}//Eo if
	
			}//Eo for

			this.markers.clearLayers();

			this.currentLayer.addTo(this.markers);
			
		}//Eo if / else
	}

	chooseThematic(thematic) {
		this.thematicToDisplay = thematic;
		this.addMarkerOnClick(this.statusToDisplay);
	}

	addMarkerOnInit(members: Member[]) { // instance du marker.

		for ( let member of members) {

			let index = members.indexOf(member);

			this.addMemberPopupToLayer(member, index, this.allMembers);
			
		}//Eo for
	}//Eo addMarker()

	addMemberPopupToLayer(member: Member, index: number, layer: L.LayerGroup<any>) {
		
		if (member.isOrganization == true) {

			const marker = L.marker([member.lat, member.lng], {icon: this.organizationIcon});// Création du marker

			marker.bindPopup(fl => this.makePopup(member, index)); // quand on bind le popup on lui ajoute en tant qu'enfant le contenu html du LeafletPopupComponent.

			marker.addTo(layer);// On ajoute au layer approprié.

		} else if(member.isOrganization == false) {

			const marker = L.marker([member.lat, member.lng], {icon: this.memberIcon});// Création du marker

			marker.bindPopup(fl => this.makePopup(member, index)); // quand on bind le popup on lui ajoute en tant qu'enfant le contenu html du LeafletPopupComponent.

			marker.addTo(layer);// On ajoute au layer approprié.
		} 	
	}//Eo addMemberPopupToLayer

	makePopup(member: Member, index: number) {

		const popup: NgElement & WithProperties<LeafletPopupComponent> = document.createElement('popup-element') as any;
		
		popup.addEventListener('closed', () => document.body.removeChild(popup));
		popup.memberId = index;
		popup.member = member;

		return document.body.appendChild(popup);
	}//Eo makePopup

	makeLayerCarto() {

		this.allMembers.addTo(this.markers);

	}//Eo makeLayerCarto

	/* clickable events */

	onDisplayAll() {

		this.statusToDisplay = 'all';
		this.thematicToDisplay = 'all';
		this.selectOptionsStatus.reset('all');
		this.selectOptionsThematic.reset('all');

		this.addMarkerOnClick(this.statusToDisplay);
		/*for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.markers.clearLayers();
		this.allMembers.addTo(this.markers);
		this.selectedCategory = null;*/
	}//Eo onDisplayAll()

	onNavigateToLogin() {
		this.router.navigate(['login']);
	}//onNavigateToLogin()

	onNavigateToRegisterAccount() {
		this.router.navigate(['register-account']);
	}//onNavigateToRegisterAccount()

	onGoToAccount() {
		this.router.navigate(['user-account']);
	}//Eo onGoToAccount()

	/* EO Clickables events functions*/

	ngOnDestroy() {
  		this.memberSubscription.unsubscribe();
  	}//Eo ngOnDestroy()

}//EO class
