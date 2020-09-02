import { Component, OnInit, OnDestroy, NgZone, ElementRef, AfterViewInit } from '@angular/core'; 
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

	allMembers = L.layerGroup();
	/* status layers */
	doctorants = L.layerGroup();
	etudiants = L.layerGroup();
	postDoctorants = L.layerGroup();
	enseignantsChercheurs = L.layerGroup();
	professionnels = L.layerGroup();
	public = L.layerGroup();
	prive = L.layerGroup();
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
					this.urbain,
					this.public,
					this.prive];

	selectedCategory: string = null; // Etat courant de la selection de category. Null = all categories.

	/* Map Icons */
	memberIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: '../assets/icons/member.png',
		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
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

	markers = L.markerClusterGroup();

	/* CONSTRUCTOR */
	constructor(private membersService: MembersService,
				private router: Router) { }

	/* ON INIT */
	ngOnInit(): void {
		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => {

				this.onMembersLoading(members);

				this.makeLayerCarto();

				this.map.addLayer(this.markers);
			});

		this.membersService.getMembers();

		this.createMap();

		console.log('init accueil')

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

		const zoomLevel = 3; // niveau de zoom initial.

		this.map = L.map('map', { //Instance de l'objet map.
			center: [univRennes2.lat, univRennes2.lng],
			zoom: zoomLevel,
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

			this.addAllMembersPopupToLayer(member, index, this.allMembers);
	
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
			if(member.status.indexOf(Category.STATUS_PUBLIC) > -1){
				this.addMemberPopupToLayer(member, index, this.public);
			}//Eo if
			if(member.status.indexOf(Category.STATUS_PRIVE) > -1){
				this.addMemberPopupToLayer(member, index, this.prive);
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

	addAllMembersPopupToLayer(member: Member, index: number, layer: L.LayerGroup<any>) {

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

	onSetDoctorants() {
		/*this.map.addLayer(this.doctorants);*/
		this.markers.clearLayers();
		this.doctorants.addTo(this.markers);
		this.selectedCategory = Category.STATUS_DOCTORANT;
	}//Eo onSetDoctorants()

	onSetEtudiants() {
		this.markers.clearLayers();
		this.etudiants.addTo(this.markers);
		this.selectedCategory = Category.STATUS_ETUDIANT;
	}//Eo onSetEtudiants

	onSetPostDoctorants() {
		this.markers.clearLayers();
		this.postDoctorants.addTo(this.markers);
		this.selectedCategory = Category.STATUS_POST_DOCTORANT;
	}//Eo onSetPostDoctorants()

	onSetEnseignants() {
		this.markers.clearLayers();
		this.enseignantsChercheurs.addTo(this.markers);
		this.selectedCategory = Category.STATUS_ENSEIGNANT;
	}//Eo onSetEnseignants()

	onSetProfessionnels() {
		this.markers.clearLayers();
		this.professionnels.addTo(this.markers);
		this.selectedCategory = Category.STATUS_PROFESSIONNEL;
	}//Eo onSetProfessionnels()

	onSetPublic() {
		this.markers.clearLayers();
		this.public.addTo(this.markers);
		this.selectedCategory = Category.STATUS_PUBLIC;
	}//Eo onSetProfessionnels()

	onSetPrive() {
		this.markers.clearLayers();
		this.prive.addTo(this.markers);
		this.selectedCategory = Category.STATUS_PRIVE;
	}//Eo onSetProfessionnels()

	onDisplayAll() {
		for(let layer of this.layersArray) {
			this.map.removeLayer(layer);}
		this.markers.clearLayers();
		this.allMembers.addTo(this.markers);
		this.selectedCategory = null;
	}//Eo onDisplayAll()

	selectThematic(value) {
		switch(value) {
		    case "Agriculture de Précision":
		    	this.markers.clearLayers();
				this.agriculturedePrecision.addTo(this.markers);
				this.selectedCategory = Category.THEME_AGRICULTURE_PRECI;
		       break;
		    case "Archéologie":
				this.markers.clearLayers();
				this.archeologie.addTo(this.markers);
				this.selectedCategory = Category.THEME_ARCHEOLOGIE;
		       break;
	       case "Climatologie":
		      	this.markers.clearLayers();
				this.climatologie.addTo(this.markers);
				this.selectedCategory = Category.THEME_CLIMATOLOGIE;
		       break;
	       case "Ecologie":
		        this.markers.clearLayers();
				this.ecologie.addTo(this.markers);
				this.selectedCategory = Category.THEME_ECOLOGIE;
		       break;
	       case "Géographie":
		       	this.markers.clearLayers();
				this.geographie.addTo(this.markers);
				this.selectedCategory = Category.THEME_GEOGRAPHIE
		       break;
	       case "Géologie":
		        this.markers.clearLayers();
				this.geologie.addTo(this.markers);
				this.selectedCategory = Category.THEME_GEOLOGIE;
		       break;
	       case "Géosciences":
		        this.markers.clearLayers();
				this.geosciences.addTo(this.markers);
				this.selectedCategory = Category.THEME_GEOSCIENCES;
		       break;
	       case "Hydrologie":
		        this.markers.clearLayers();
				this.hydrologie.addTo(this.markers);
				this.selectedCategory = Category.THEME_HYDROLOGIE;
		       break;
	       case "Informatique":
		        this.markers.clearLayers();
				this.informatique.addTo(this.markers);
				this.selectedCategory = Category.THEME_INFORMATIQUE;
		       break;
	       case "Intelligence Artificielle":
		        this.markers.clearLayers();
				this.intelligenceArtificielle.addTo(this.markers);
				this.selectedCategory = Category.THEME_IA;
		       break;	
				this.selectedCategory = Category.THEME_MATHS;
	       case "Mathématiques":
		        this.markers.clearLayers();
				this.mathematiques.addTo(this.markers);
				this.selectedCategory = Category.THEME_MATHS;
		       break;	
	       case "Météorologie":
		        this.markers.clearLayers();
				this.meteorologie.addTo(this.markers);
				this.selectedCategory = Category.THEME_METEO;
		       break;	
	       case "Modélisation":
		        this.markers.clearLayers();
				this.modelisation.addTo(this.markers);
				this.selectedCategory = Category.THEME_MODELISATION;
		       break;	
	       case "Océanographie":
		        this.markers.clearLayers();
				this.oceanographie.addTo(this.markers);
				this.selectedCategory = Category.THEME_OCEANOGRAPHIE;
		       break;	
	       case "Optique":
		        this.markers.clearLayers();
				this.optique.addTo(this.markers);
				this.selectedCategory = Category.THEME_OPTIQUE;
		       break;	
	       case "Modélisation":
		        this.markers.clearLayers();
				this.modelisation.addTo(this.markers);
				this.selectedCategory = Category.THEME_MODELISATION;
		       break;	
	       case "Radar":
		        this.markers.clearLayers();
				this.radar.addTo(this.markers);
				this.selectedCategory = Category.THEME_RADAR;
		       break;	
	       case "Risques Naturels":
		        this.markers.clearLayers();
				this.riquesNaturels.addTo(this.markers);
				this.selectedCategory = Category.THEME_RISQUESNATURELS;
		       break;	
	       case "Statistiques":
		        this.markers.clearLayers();
				this.statistiques.addTo(this.markers);
				this.selectedCategory = Category.THEME_STATISTIQUES;
		       break;		
	       case "Système d’information Géographique (S.I.G.)":
		        this.markers.clearLayers();
				this.sig.addTo(this.markers);
				this.selectedCategory = Category.THEME_SIG;
		       break;	
	       case "Traitement du signal":
		        this.markers.clearLayers();
				this.traitementSignal.addTo(this.markers);
				this.selectedCategory = Category.THEME_TRAITEMENTSIGNAL;
		       break;	
	       case "Urbain":
		        this.markers.clearLayers();
				this.urbain.addTo(this.markers);
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