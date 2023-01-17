import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {AssistantComponent} from './assistant/assistant.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
// import { AuthGuard } from './guards';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [ 
  
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'assistant', component: AssistantComponent, canActivate: [AngularFireAuthGuard] },
  
  
  // {
  //   path: '',
  //   component: AppLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: '/', pathMatch: 'full'},
  //     { path: 'writing-assistant', component: writingAssistant},
  //     { path: 'profile', component: ProfileComponent},
  //     ],
  //     canActivate: [AuthGuard]
  //   },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
