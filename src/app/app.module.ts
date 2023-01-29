import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import {AssistantComponent} from './assistant/assistant.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
// import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './account/profile/profile.component';
import { CreditsComponent } from './account/credits/credits.component';
import { HomeComponent } from './home/home.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SignupHeaderComponent } from './layout/signup-header/signup-header.component';

@NgModule({
  declarations: [
    AppComponent,HeaderComponent, FooterComponent, SignupHeaderComponent, SignupComponent, PrivacyPolicyComponent, TermsOfServiceComponent, LoginComponent, AssistantComponent, VerifyEmailComponent,AccountComponent, ProfileComponent, HomeComponent, CreditsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AngularEditorModule,
    HttpClientModule, FormsModule, AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule, MaterialModule, ReactiveFormsModule, provideAuth(() => getAuth()), provideDatabase(() => getDatabase())
  ],
  providers: [
    // { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
