import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, CanActivate } from '@angular/router'; // routing
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MembersService } from './services/members.service';
import { MemberListComponent } from './member-list/member-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SingleProfileComponent } from './single-profile/single-profile.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegisterProfileComponent } from './register-profile/register-profile.component';
import { RegisterAccountComponent } from './register-account/register-account.component';


const appRoutes: Routes = [
  { path: 'member/profile/:id', component: SingleProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register-profile', component: RegisterProfileComponent},
  { path: 'register-account', component: RegisterAccountComponent},
  { path: '', component: MapComponent}

];//routing

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MemberListComponent,
    SearchBarComponent,
    SingleProfileComponent,
    LoginComponent,
    RegisterProfileComponent,
    RegisterAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes) //routing
  ],
  providers: [
    MembersService,
    AuthService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
