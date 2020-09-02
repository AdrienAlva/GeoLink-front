import { Component, OnInit, Input, OnDestroy } from '@angular/core'; 
import { Router } from '@angular/router';
import { Member } from '../models/Member.model';
import { MembersService } from '../services/members.service';
import { Subscription } from 'rxjs/Subscription';
import * as Category from '../map/category.constants';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  @Input() selectedCategory: string;
  

  constructor(private membersService: MembersService,private router: Router) { }

  members: Member[]; //Array local vide.

  memberSubscription: Subscription;

  studentlist: [];

  ngOnInit(): void {
  	this.memberSubscription = this.membersService.membersSubject.subscribe( 
  		(members: any[]) => {
  			this.members = members;
        console.log(this.members);
  		}
  	);

  	this.membersService.getMembers();
	  this.membersService.emitMembers();
  }//Eo ngOnInit()

  onViewMember(id: number) {
    this.router.navigate(['member', 'profile', id]);
  }//Eo onViewBook()

  filterByCategory(member: Member) {
    if(this.selectedCategory) {
      return member.status.indexOf(this.selectedCategory) > - 1 ||
             member.thematics.indexOf(this.selectedCategory) > - 1;
    }

    // Selectionne toutes les catégories existantes si aucune catégorie n'est selectionné dans selectedCategory.
    return member.status.indexOf(Category.STATUS_ETUDIANT) > - 1 || 
           member.status.indexOf(Category.STATUS_DOCTORANT) > - 1 || 
           member.status.indexOf(Category.STATUS_POST_DOCTORANT) > - 1 || 
           member.status.indexOf(Category.STATUS_ENSEIGNANT) > - 1 || 
           member.status.indexOf(Category.STATUS_PROFESSIONNEL) > - 1 ||
           member.thematics.indexOf(Category.THEME_AGRICULTURE_PRECI) > - 1 ||
           member.thematics.indexOf(Category.THEME_ARCHEOLOGIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_CLIMATOLOGIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_ECOLOGIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_GEOGRAPHIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_GEOLOGIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_GEOSCIENCES) > - 1 ||
           member.thematics.indexOf(Category.THEME_HYDROLOGIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_INFORMATIQUE) > - 1 ||
           member.thematics.indexOf(Category.THEME_IA) > - 1 ||
           member.thematics.indexOf(Category.THEME_MATHS) > - 1 ||
           member.thematics.indexOf(Category.THEME_METEO) > - 1 ||
           member.thematics.indexOf(Category.THEME_MODELISATION) > - 1 ||
           member.thematics.indexOf(Category.THEME_OCEANOGRAPHIE) > - 1 ||
           member.thematics.indexOf(Category.THEME_OPTIQUE) > - 1 ||
           member.thematics.indexOf(Category.THEME_RADAR) > - 1 ||
           member.thematics.indexOf(Category.THEME_RISQUESNATURELS) > - 1 ||
           member.thematics.indexOf(Category.THEME_STATISTIQUES) > - 1 ||
           member.thematics.indexOf(Category.THEME_SIG) > - 1 ||
           member.thematics.indexOf(Category.THEME_TRAITEMENTSIGNAL) > - 1 ||
           member.thematics.indexOf(Category.THEME_URBAIN) > - 1;
  }//Eo filterByCategory()  

}//Eo class
