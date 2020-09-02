import { Component, OnInit, OnDestroy, NgZone, ElementRef } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import * as Category from './category.constants';
import { NgElement, WithProperties } from '@angular/elements';
import { LeafletPopupComponent } from '../leaflet-popup/leaflet-popup.component';
import { JwtModule } from "@auth0/angular-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy { 

	refToken = localStorage.getItem("token");
	helper = new JwtHelperService();
	isExpired = this.helper.isTokenExpired(this.refToken);

	memberSubscription: Subscription;
	members: Member[] = [];

	map; // variable pour stocker la map.

	/* status layers */
	doctorants = L.layerGroup();
	etudiants = L.layerGroup();
	postDoctorants = L.layerGroup();
	enseignantsChercheurs = L.layerGroup();
	professionnels = L.layerGroup();
	/* thematics layers */
	agriculturedePrecision = L.layerGroup();
	archeologie = L.layerGroup();
	climatologie = L.layerGroup();
	ecologie = L.layerGroup();
	geographie = L.layerGroup();
	geologie = L.layerGroup();
	geosciences = L.layerGroup();
	hydrologie = L.layerGroup();
	informatique = L.layerGroup();
	intelligenceArtificielle = L.layerGroup();
	mathematiques = L.layerGroup();
	meteorologie = L.layerGroup();
	modelisation = L.layerGroup();
	oceanographie = L.layerGroup();
	optique = L.layerGroup();
	radar = L.layerGroup();
	riquesNaturels = L.layerGroup();
	statistiques = L.layerGroup();
	sig = L.layerGroup();
	traitementSignal = L.layerGroup();
	urbain = L.layerGroup();
	/* array of all layers*/
	layersArray = [ this.doctorants, 
					this.etudiants,
					this.postDoctorants,
					this.enseignantsChercheurs,
					this.professionnels,
					this.agriculturedePrecision,
					this.archeologie,
					this.climatologie,
					this.ecologie,
					this.geographie,
					this.geologie,
					this.geosciences,
					this.hydrologie,
					this.informatique,
					this.intelligenceArtificielle,
					this.mathematiques,
					this.meteorologie,
					this.modelisation,
					this.oceanographie,
					this.optique,
					this.radar,
					this.riquesNaturels,
					this.statistiques,
					this.sig,
					this.traitementSignal,
					this.urbain];

	selectedCategory: string = null; // Etat courant de la selection de category. Null = all categories.

	/* Map Icons */
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

	/* CONSTRUCTOR */
	constructor(private membersService: MembersService,
				private router: Router) { }

	/* ON INIT */
	ngOnInit(): void {
		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => this.onMembersLoading(members)
  		);

		this.membersService.getMembers();
		this.createMap();
		this.makeLayerCarto();

	}//Eo ngOnInit()

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
			layers: [this.doctorants]
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

			let index = members.indexOf(member);
	
			if(member.status.indexOf(Category.STATUS_ETUDIANT) > -1){
				this.addMemberPopupToLayer(member, index, this.etudiants);
			}//Eo if
			if(member.status.indexOf(Category.STATUS_DOCTORANT) > -1){
				this.addMemberPopupToLayer(member, index, this.doctorants);
			}//Eo if
			if(member.status.indexOf(Category.STATUS_POST_DOCTORANT) > -1){
				this.addMemberPopupToLayer(member, index, this.postDoctorants);
			}//Eo if
			if(member.status.indexOf(Category.STATUS_ENSEIGNANT) > -1){
				this.addMemberPopupToLayer(member, index, this.enseignantsChercheurs);
			}//Eo if
			if(member.status.indexOf(Category.STATUS_PROFESSIONNEL) > -1){
				this.addMemberPopupToLayer(member, index, this.professionnels);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_AGRICULTURE_PRECI) > -1){
				this.addMemberPopupToLayer(member, index, this.agriculturedePrecision);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_ARCHEOLOGIE) > -1){
				this.addMemberPopupToLayer(member, index, this.archeologie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_CLIMATOLOGIE) > -1){
				this.addMemberPopupToLayer(member, index, this.climatologie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_ECOLOGIE) > -1){
				this.addMemberPopupToLayer(member, index, this.ecologie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_GEOGRAPHIE) > -1){
				this.addMemberPopupToLayer(member, index, this.geographie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_GEOLOGIE) > -1){
				this.addMemberPopupToLayer(member, index, this.geologie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_GEOSCIENCES) > -1){
				this.addMemberPopupToLayer(member, index, this.geosciences);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_HYDROLOGIE) > -1){
				this.addMemberPopupToLayer(member, index, this.hydrologie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_INFORMATIQUE) > -1){
				this.addMemberPopupToLayer(member, index, this.informatique);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_IA) > -1){
				this.addMemberPopupToLayer(member, index, this.intelligenceArtificielle);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_MATHS) > -1){
				this.addMemberPopupToLayer(member, index, this.mathematiques);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_METEO) > -1){
				this.addMemberPopupToLayer(member, index, this.meteorologie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_MODELISATION) > -1){
				this.addMemberPopupToLayer(member, index, this.modelisation);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_OCEANOGRAPHIE) > -1){
				this.addMemberPopupToLayer(member, index, this.oceanographie);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_OPTIQUE) > -1){
				this.addMemberPopupToLayer(member, index, this.optique);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_RADAR) > -1){
				this.addMemberPopupToLayer(member, index, this.radar);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_RISQUESNATURELS) > -1){
				this.addMemberPopupToLayer(member, index, this.riquesNaturels);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_STATISTIQUES) > -1){
				this.addMemberPopupToLayer(member, index, this.statistiques);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_SIG) > -1){
				this.addMemberPopupToLayer(member, index, this.sig);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_TRAITEMENTSIGNAL) > -1){
				this.addMemberPopupToLayer(member, index, this.traitementSignal);
			}//Eo if
			if(member.thematics.indexOf(Category.THEME_URBAIN) > -1){
				this.addMemberPopupToLayer(member, index, this.urbain);
			}//Eo if		
		}//Eo for
	}//Eo addMarker()

	addMemberPopupToLayer(member: Member, index: number, layer: L.LayerGroup<any>) {
		
		const marker = L.marker([member.lat, member.lng], {icon: this.smallIcon});// Création du marker
		marker.bindPopup(fl => this.makePopup(member, index)); // quand on bind le popup on lui ajoute en tant qu'enfant le contenu html du LeafletPopupComponent.
		marker.addTo(layer);// On ajoute au layer approprié.
	
	}//Eo addMemberPopupToLayer

	makePopup(member: Member, index: number) {

		const popup: NgElement & WithProperties<LeafletPopupComponent> = document.createElement('popup-element') as any;
		
		popup.addEventListener('closed', () => document.body.removeChild(popup));
		popup.memberId = index;
		popup.member = member;

		return document.body.appendChild(popup);
	}//Eo makePopup

	makeLayerCarto() {
		/*let markers =  L.markerClusterGroup();*/
		for(let layer of this.layersArray) {
			this.map.addLayer(layer);
		}

		/*this.map.addLayer(markers);*/

	}//Eo makeLayerCarto

	/* clickable events */

	onSetDoctorants() {
		for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.map.addLayer(this.doctorants);
		this.selectedCategory = Category.STATUS_DOCTORANT;
	}//Eo onSetDoctorants()

	onSetEtudiants() {
		for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.map.addLayer(this.etudiants);
		this.selectedCategory = Category.STATUS_ETUDIANT;
	}//Eo onSetEtudiants

	onSetPostDoctorants() {
		for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.map.addLayer(this.postDoctorants);
		this.selectedCategory = Category.STATUS_POST_DOCTORANT;
	}//Eo onSetPostDoctorants()

	onSetEnseignants() {
		for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.map.addLayer(this.enseignantsChercheurs);
		this.selectedCategory = Category.STATUS_ENSEIGNANT;
	}//Eo onSetEnseignants()

	onSetProfessionnels() {
		for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.map.addLayer(this.professionnels);
		this.selectedCategory = Category.STATUS_PROFESSIONNEL;
	}//Eo onSetProfessionnels()

	onDisplayAll() {
		for(let layer of this.layersArray) {
			this.map.addLayer(layer);}
		this.selectedCategory = null;
	}//Eo onDisplayAll()

	selectThematic(value) {
		switch(value) {
		    case "Agriculture de Précision":
		    	for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.agriculturedePrecision);
				this.selectedCategory = Category.THEME_AGRICULTURE_PRECI;
		       break;
		    case "Archéologie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.archeologie);
				this.selectedCategory = Category.THEME_ARCHEOLOGIE;
		       break;
	       case "Climatologie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.climatologie);
				this.selectedCategory = Category.THEME_CLIMATOLOGIE;
		       break;
	       case "Ecologie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.ecologie);
				this.selectedCategory = Category.THEME_ECOLOGIE;
		       break;
	       case "Géographie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.geographie);
				this.selectedCategory = Category.THEME_GEOGRAPHIE
		       break;
	       case "Géologie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.geologie);
				this.selectedCategory = Category.THEME_GEOLOGIE;
		       break;
	       case "Géosciences":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.geosciences);
				this.selectedCategory = Category.THEME_GEOSCIENCES;
		       break;
	       case "Hydrologie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.hydrologie);
				this.selectedCategory = Category.THEME_HYDROLOGIE;
		       break;
	       case "Informatique":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.informatique);
				this.selectedCategory = Category.THEME_INFORMATIQUE;
		       break;
	       case "Intelligence Artificielle":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.intelligenceArtificielle);
				this.selectedCategory = Category.THEME_IA;
		       break;	
				this.selectedCategory = Category.THEME_MATHS;
	       case "Mathématiques":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.mathematiques);
				this.selectedCategory = Category.THEME_MATHS;
		       break;	
	       case "Météorologie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.meteorologie);
				this.selectedCategory = Category.THEME_METEO;
		       break;	
	       case "Modélisation":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.modelisation);
				this.selectedCategory = Category.THEME_MODELISATION;
		       break;	
	       case "Océanographie":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.oceanographie);
				this.selectedCategory = Category.THEME_OCEANOGRAPHIE;
		       break;	
	       case "Optique":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.optique);
				this.selectedCategory = Category.THEME_OPTIQUE;
		       break;	
	       case "Modélisation":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.modelisation);
				this.selectedCategory = Category.THEME_MODELISATION;
		       break;	
	       case "Radar":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.radar);
				this.selectedCategory = Category.THEME_RADAR;
		       break;	
	       case "Risques Naturels":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.riquesNaturels);
				this.selectedCategory = Category.THEME_RISQUESNATURELS;
		       break;	
	       case "Statistiques":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.statistiques);
				this.selectedCategory = Category.THEME_STATISTIQUES;
		       break;		
	       case "Système d’information Géographique (S.I.G.)":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.sig);
				this.selectedCategory = Category.THEME_SIG;
		       break;	
	       case "Traitement du signal":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.traitementSignal);
				this.selectedCategory = Category.THEME_TRAITEMENTSIGNAL;
		       break;	
	       case "Urbain":
		       for(let layer of this.layersArray) {
					this.map.removeLayer(layer);}
	      		this.map.addLayer(this.urbain);
				this.selectedCategory = Category.THEME_URBAIN;
		       break;			       		       		       	       		       		       		       		       		       		       		       		       		       		       		       		       		       
		}//Eo switch
	}//Eo selectThematic()

	onNavigateToLogin() {
		this.router.navigate(['login']);
	}//onNavigateToLogin()

	onNavigateToRegisterAccount() {
		this.router.navigate(['register-account']);
	}//onNavigateToRegisterAccount()

	onGoToAccount() {
		this.router.navigate(['user-account']);
	}//Eo onGoToAccount()

	onLogout() {
		localStorage.removeItem('token');
	}//Eo onLogout()

	/* EO Clickables events functions*/

	isConnected() {
		let isConnected = localStorage.getItem('token');
		return isConnected;
	}//eo isConnected

	ngOnDestroy() {
  		this.memberSubscription.unsubscribe();
  	}//Eo ngOnDestroy()

}//EO class