import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import * as L from 'leaflet';

@Component({
  selector: 'app-single-profile',
  templateUrl: './single-profile.component.html',
  styleUrls: ['./single-profile.component.css']
})
export class SingleProfileComponent implements OnInit {

	members: Member[] = [];
	memberSubscription: Subscription;

	memberId: number;

	/* single profile map var*/

	map;

	smallIcon = new L.Icon({  // Instance de l'icon pour le marker.
		iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		shadowSize:  [41, 41]
	});
	

	constructor(private membersService: MembersService,
				private router: Router,
				private route: ActivatedRoute) {}

	ngOnInit(){

		this.memberId = this.route.snapshot.params['id']; // on récupère l'id du membre en faisant un snapshot de la route.

		this.router.events.subscribe((data) => { //On adapte l'id quand la route change.
      		if (data instanceof RoutesRecognized) {
        		this.memberId = data.state.root.firstChild.params["id"];  
      		}	
    	});

		this.memberSubscription = this.membersService.membersSubject.subscribe( 
	  		(members: Member[]) => {
	  			this.onMembersLoading(members);
	  		}
		);

		this.membersService.getMembers();	
		console.log('init profile')	

	}//Eo ngOnInit()


	onMembersLoading(members: Member[]){
		this.members = members;
		this.createMap();
		this.addMarker();
	}//Eo onMembersLoading()

	createMap() {
		console.log('createMap')

		const zoomLevel = 8; // niveau de zoom initial.

		this.map = L.map('map', { //Instance de l'objet map.
			center: [this.members[this.memberId].lat, this.members[this.memberId].lng],
			zoom: zoomLevel,
			layers: []
		});

		const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		  		minZoom: 3,
		  		maxZoom: 17,
		  		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		  	});

		mainLayer.addTo(this.map); // methode pour ajouter les options de configuration de la carte. tileLayer / min-max zoom / attribution.
			
	}//Eo createMap()

	addMarker() { // instance du marker.
			
				const memberMarker = L.marker([this.members[this.memberId].lat, this.members[this.memberId].lng], {icon: this.smallIcon});
					
				memberMarker.addTo(this.map).bindPopup(this.members[this.memberId].name + ' ' + this.members[this.memberId].surname + '<br>' + this.members[this.memberId].status).openPopup();		 	

	}//Eo addMarker()

}//Eo class
