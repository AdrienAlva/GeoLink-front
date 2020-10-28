import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StatisticsService } from '../services/statistics.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

	statusStatsSubscription: Subscription;
	statusFromReq = {};


	constructor(private httpClient: HttpClient,
				private statisticsService: StatisticsService) { }

	ngOnInit(): void {

		this.statusStatsSubscription = this.statisticsService.statusStatsSubject.subscribe( 
	  		(stats: []) => {
	  			
			this.statusFromReq = stats;

			console.log(this.statusFromReq);

			let graph = <HTMLCanvasElement>document.getElementById("status");

			graph.width = 300;
			graph.height = 300;

			let ctx = graph.getContext('2d');

			var Piechart = function(options){
			    this.options = options;
			    this.canvas = options.canvas;
			    this.ctx = this.canvas.getContext("2d");
			    this.colors = options.colors;
			 
			    this.draw = function(){
			        var total_value = 0;
			        var color_index = 0;
			        for (var categ in this.options.data){
			            var val = this.options.data[categ];
			            total_value += val;
			        }
			 
			        var start_angle = 0;

			        for (categ in this.options.data){
			            val = this.options.data[categ];
			            var slice_angle = 2 * Math.PI * val / total_value;

		            	function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
						    ctx.fillStyle = color;
						    ctx.beginPath();
						    ctx.moveTo(centerX,centerY);
						    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
						    ctx.closePath();
						    ctx.fill();
						}//Eo drawPieSlice()
			 
			            drawPieSlice(
			                this.ctx,
			                this.canvas.width/2,
			                this.canvas.height/2,
			                Math.min(this.canvas.width/2,this.canvas.height/2),
			                start_angle,
			                start_angle+slice_angle,
			                this.colors[color_index%this.colors.length]
			            );
			 
			            start_angle += slice_angle;
			            color_index++;
			        }

			        for (categ in this.options.data){
					    val = this.options.data[categ];
					    slice_angle = 2 * Math.PI * val / total_value;
					    var pieRadius = Math.min(this.canvas.width/2,this.canvas.height/2);
					    var labelX = this.canvas.width/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
					    var labelY = this.canvas.height/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);
					 
					    var labelText = Math.round(100 * val / total_value *100) / 100;
					    this.ctx.fillStyle = "black";
					    this.ctx.font = "bold 12px Arial";
					    this.ctx.fillText(labelText+"% (" + this.options.data[categ] +")", labelX,labelY);
					    start_angle += slice_angle;
					}

			 		if (this.options.legend){
			            color_index = 0;
			            var legendHTML = "";
			            for (categ in this.options.data){
			                legendHTML += "<div><span style='display:inline-block;width:20px;background-color:"+this.colors[color_index++]+";'>&nbsp;</span> "+categ+"</div>";
			            }
			            this.options.legend.innerHTML = legendHTML;
	        		}
	    		}
			}//Eo Piechart class

			var myLegend = document.getElementById("statusLegend");

			var myPiechart = new Piechart(
		    	{
		        	canvas:graph,
		        	data:this.statusFromReq,
		        	colors:["#e01a4f","#f15946", "#f9c22e","#53b3cb","#e0771b","#f2d846","#545ccc"],
		        	legend:myLegend
		    	}
			);
			myPiechart.draw();


		});//Eo SUBCRIPTION

		this.statisticsService.getStatusStats();

	}//Eo ngOnInit()

	drawLine (ctx, startX, startY, endX, endY) {
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
	}//Eo drawLine()

	drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
	    ctx.beginPath();
	    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	    ctx.stroke();
	}	//Eo drawArc()

/*	onGetStats() {

	    this.httpClient.get('http://localhost:3000/stats')
	      .subscribe(
	        (res) => {
	         console.log(res);
	         this.statusFromReq = res;
	        },
	        (err) => {
	          console.log('Erreur ! : ' + err);
	        }
	    );  
	}//Eo onSubmitRegisterAccount()*/


}//Eo class
