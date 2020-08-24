import { Component, OnInit, Input } from '@angular/core';
import { Member } from '../models/Member.model';

@Component({
  selector: 'app-leaflet-popup',
  templateUrl: './leaflet-popup.component.html',
  styleUrls: ['./leaflet-popup.component.css']
})
export class LeafletPopupComponent implements OnInit {

  @Input() memberId: number; // index pour la route routerLink qui dirige vers la page profil.
  @Input() member: Member;

  constructor() { }

  ngOnInit(): void {
  }

  firstLetterToUpper(word) {
    	return word.substr(0,1).toUpperCase()+word.substr(1);
  	}//Eo firstLetterToUpper

}//Eo class

/* Component pour bind le popup leaflet */
