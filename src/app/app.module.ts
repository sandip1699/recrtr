import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "./header/header.component";
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

@NgModule({
  declarations: [
    AppComponent,HeaderComponent, SignupComponent, LoginComponent, AssistantComponent, VerifyEmailComponent
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
