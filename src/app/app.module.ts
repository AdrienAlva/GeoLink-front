import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Routes, RouterModule, CanActivate } from '@angular/router'; // routing
import {HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { createCustomElement } from '@angular/elements';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RECAPTCHA_LANGUAGE, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';

/*---------------------------------------------------------------------------------*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MembersService } from './services/members.service';
import { MemberListComponent } from './member-list/member-list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SingleProfileComponent } from './single-profile/single-profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MemberToDisplayService } from './services/member-to-display.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterProfileComponent } from './register-profile/register-profile.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { LeafletPopupComponent } from './leaflet-popup/leaflet-popup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ValidationComponent } from './validation/validation.component';
import { ManagementComponent } from './management/management.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SentRequestComponent } from './sent-request/sent-request.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ProfilTypeComponent } from './profil-type/profil-type.component';
import { RegisterProfileOrganizationComponent } from './register-profile-organization/register-profile-organization.component';
import { ClickOutsideModule } from 'ng-click-outside';
/*import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';*/



const appRoutes: Routes = [
  { path: 'member/profile/:id', component: SingleProfileComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recovery', component: RecoveryComponent},
  { path: 'user-account', canActivate: [AuthGuardService], component: UserAccountComponent},
  { path: 'update-profile', canActivate: [AuthGuardService], component: UpdateProfileComponent},
  { path: 'update-password', canActivate: [AuthGuardService], component: UpdatePasswordComponent},
  { path: 'register-profile', canActivate: [AuthGuardService], component: RegisterProfileComponent},
  { path: 'register-profile-organization', canActivate: [AuthGuardService], component: RegisterProfileOrganizationComponent},
  { path: 'profil-type', canActivate: [AuthGuardService], component: ProfilTypeComponent},
  { path: 'sent-request', canActivate: [AuthGuardService], component: SentRequestComponent},
  { path: 'register-account', component: RegisterAccountComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'admin-panel', canActivate: [AuthGuardAdminService], component: AdminPanelComponent},
  { path: 'management', canActivate: [AuthGuardAdminService], component: ManagementComponent},
  { path: 'validation', canActivate: [AuthGuardAdminService], component: ValidationComponent},
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
    FourOhFourComponent,
    ValidationComponent,
    ManagementComponent,
    UserAccountComponent,
    UpdateProfileComponent,
    SentRequestComponent,
    RecoveryComponent,
    UpdatePasswordComponent,
    ProfilTypeComponent,
    RegisterProfileOrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ClickOutsideModule,
    RouterModule.forRoot(appRoutes),
    /*FontAwesomeModule*/ 
  ],
  providers: [
    MembersService,
    AuthService,
    AuthGuardService,
    AuthGuardAdminService,
    MemberToDisplayService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LdQscUZAAAAALAAeFdf-dR3dxlNC-kB3A2qHQYf' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'fr', // use French language
    }
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
