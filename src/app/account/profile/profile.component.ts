import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  countclick: any;
  userData:any;
  curentuserinfo: any;
  curentkey:any
  useremail: any;
  username : any;
  useruid: any;
  percenvalue:any;
  plan:any;
  profileupdated:any;
  planexpry:any;
  uid: any = localStorage.getItem('currentUser');


  constructor(private authservice:AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authservice.getuserInfo().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.userData = data;
      this.curentuserinfo = [];
      this.userData.forEach((item:any) =>{
        if(item.userid == this.uid){
          this.curentuserinfo.push(item);
        }
      });
      this.curentuserinfo.map((a:any) => {
        this.curentkey = a;
        this.countclick = a.creditCount;
        this.useremail = a.email;
        this.username = a.username;
        this.useruid = a.userid;
        this.plan = a.plan;
        this.planexpry = a.planExpiry;
      });
      
    });
  }

  changeName(templateRef: any) {
    this.authservice.updateuserInfo(this.curentkey.key, { username: this.username })
        .then(() => {
            console.log('updated');
            this.dialog.open(templateRef, {
              width: 'auto',
              autoFocus: false
            });
          })
  }
  changepassword() {
    this.authservice.restePassword(this.useremail);
  }

  openDialog(templateRef: any) {
    this.dialog.open(templateRef, {
      width: 'auto',
      autoFocus: false
    });
   }
}
