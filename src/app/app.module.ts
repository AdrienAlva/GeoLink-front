import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MembersService } from './services/members.service';
import { MemberListComponent } from './member-list/member-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    MembersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
