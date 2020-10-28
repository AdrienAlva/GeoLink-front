import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

	statusStats: [] =[]; //array local vide.
  	statusStatsSubject = new Subject<any[]>(); // Subject pour diffuser l'array local.

	constructor(private httpClient: HttpClient) { }

	nodeRequest(){
		console.log("emit stats")
		return this.httpClient.get('http://localhost:3000/stats');
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
