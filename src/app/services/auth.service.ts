import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { Firestore, collectionData, getFirestore, doc } from '@angular/fire/firestore';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/switchMap';
// import { switchMap, map, catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { signUp } from '../model/signup';
// interface User {
//   uid : string;
//   email : string;
//   photoURL: string;
//   displayName : string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  userId : any;
  // user : Observable<User>
 
  
  constructor(private fireauth : AngularFireAuth, private router : Router) {
    // this.fireauth.authState.subscribe(user => {
    //   if(user) {
    //     this.userId=user.uid;
    //   } 
    // });
  }
  
  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        if(res.user?.emailVerified == true) {
          this.router.navigate(['assistant']);
          localStorage.setItem('currentUser', res.user?.uid);
          this.userId = localStorage.getItem('currentUser');    
        } else {
          this.router.navigate(['/verify-email']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

get isAuthenticated(): boolean {
    return this.authState !== null;
}
get isEmailVerified(): boolean {
  return this.isAuthenticated ? this.authState.emailVerified : false;
}
get currentUserId(): string {
  return this.isAuthenticated ? this.authState.uid : null;
}
get userData(): any {
  if ( ! this.isAuthenticated ) {
    return [];
  }
  return [
    {
      id: this.authState.uid,
      displayName: this.authState.displayName,
      email: this.authState.email,
      phoneNumber: this.authState.phoneNumber,
      photoURL: this.authState.photoURL,
    }
  ];
}

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/verify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }

  // email varification
  sendEmailForVarification(user : any) {
    console.log(user);
    user.sendEmailVerification().then((res : any) => {
      this.router.navigate(['/verify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }


  //sign in with google
  // googleSignIn() {
  //   return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

  //     this.router.navigate(['/assistant']);
  //     localStorage.setItem('token',JSON.stringify(res.user?.uid));

  //   }, err => {
  //     alert(err.message);
  //   })
  // }

}
