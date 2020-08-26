import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, CanActivate } from '@angular/router'; // routing
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { createCustomElement } from '@angular/elements';
/*---------------------------------------------------------------------------------*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MembersService } from './services/members.service';
import { MemberListComponent } from './member-list/member-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SingleProfileComponent } from './single-profile/single-profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegisterProfileComponent } from './register-profile/register-profile.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { LeafletPopupComponent } from './leaflet-popup/leaflet-popup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';


const appRoutes: Routes = [
  { path: 'member/profile/:id', component: SingleProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register-profile', canActivate: [AuthGuardService], component: RegisterProfileComponent},
  { path: 'register-account', canActivate: [AuthGuardService], component: RegisterAccountComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'admin-panel', canActivate: [AuthGuardAdminService], component: AdminPanelComponent},
  { path: '', component: MapComponent},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }

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
    RegisterAccountComponent,
    LeafletPopupComponent,
    AdminLoginComponent,
    AdminPanelComponent,
    FourOhFourComponent
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
    AuthGuardService,
    AuthGuardAdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LeafletPopupComponent] 
})
export class AppModule { 
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(LeafletPopupComponent, {injector}); // Nécessaire pour bind le popup leaflet.
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }
}
