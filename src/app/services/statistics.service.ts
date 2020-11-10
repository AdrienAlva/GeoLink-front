import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

	statusStats: [] =[]; //array local vide.
  	statusStatsSubject = new Subject<any[]>(); // Subject pour diffuser l'array local.

	constructor(private httpClient: HttpClient) { }

	nodeRequest(){
		console.log("emit stats")
		return this.httpClient.get(AppSettings.API_ENDPOINT + '/api/stats');
	}//Eo nodeRequest()

	emitStatusStats() { // pour emettre notre subject members au sein de l'appli.
		this.statusStatsSubject.next(this.statusStats);
	}//Eo emitMembers()

	getStatusStats() {
		this.nodeRequest().subscribe((stats: any) => {
			this.statusStats = stats;
			this.emitStatusStats();
		}); 		
	}//Eo getstats()

}//Eo service
