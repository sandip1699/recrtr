import { Injectable } from '@angular/core'; 
import { Documents } from '../model/document';
import { collection , query, where} from '@firebase/firestore';
import { provideDatabase, ref, set} from '@angular/fire/database';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  uid: any = localStorage.getItem('currentUser');
  userId: any;
  private dbPath = 'documents';
  documentsRef: AngularFireList<Documents>;    // Reference to Student data list, its an Observable
  // documentsuser: AngularFireList<Documents>;    // Reference to Student data list, its an Observable
  // note: Observable<any[]>;   // Reference to Student object, its an Observable too

  constructor(private authService:AuthService, public db:AngularFireDatabase, private fireauth : AngularFireAuth,) {
    this.documentsRef = db.list(this.dbPath, ref => ref.orderByChild('id').equalTo(this.uid));
    // this.documentsuser = db.list(this.dbPath, ref => ref.orderByChild('id').equalTo(this.uid));

   }

  addDocment(documents:Documents): any {
    return this.documentsRef.push(documents);
  }
  getDocument(): AngularFireList<Documents> {
    return this.documentsRef;
  }
  updateDocument(key: string, value: any): Promise<void> {
    return this.documentsRef.update(key, value);
  }
  deleteDocument(key: string): Promise<void> {
    return this.documentsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.documentsRef.remove();
  }


}

