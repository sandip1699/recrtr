import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getDatabase, ref, set } from '@angular/fire/database';
// import { Firestore, collectionData, getFirestore, doc } from '@angular/fire/firestore';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { UsersList } from '../model/users';
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
// import { getDatabase, ref, set } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  userId : any;
  // user : Observable<User>
  private dbPath = 'users';
  usersRef: AngularFireList<UsersList>; 
 
  
  constructor(private fireauth : AngularFireAuth, private router : Router,public db:AngularFireDatabase) {
    this.fireauth.authState.subscribe(user => {
      if(user) {
        this.userId=user.uid;
      } 
    });
    this.usersRef = db.list(this.dbPath);
  }
  // writeUserData(userId:string, name:string, email:string, imageUrl:string) {
  //   const db = getDatabase();
  //   set(ref(db, 'users/' + userId), {
  //     username: name,
  //     email: email,
  //     profile_picture : imageUrl
  //   });
  // }
  
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
      // this.db.list(`users/${userCredential.user.uid}`).set({

      this.usersRef.push({
        email: email,
        userid: res.user?.uid,
        creditCount: 50
      })
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

getuserInfo(): AngularFireList<UsersList> {
  return this.usersRef;
}
updateuserInfo(key: string, value: any): Promise<void> {
  return this.usersRef.update(key, value);
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
