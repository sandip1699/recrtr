import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AssistantComponent} from './assistant/assistant.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
// import { AuthGuard } from './guards';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './account/profile/profile.component';
import { CreditsComponent } from './account/credits/credits.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import {BooleanStringsComponent} from './boolean-strings/boolean-strings.component';

const routes: Routes = [ 
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'boolean-strings', component: BooleanStringsComponent, canActivate: [AngularFireAuthGuard] },
  { path: 'assistant', component: AssistantComponent, canActivate: [AngularFireAuthGuard] },
  
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: '/', pathMatch: 'full'},
      { path: 'credits', component: CreditsComponent},
      { path: 'profile', component: ProfileComponent},
      ],
      canActivate: [AngularFireAuthGuard]
    },

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
