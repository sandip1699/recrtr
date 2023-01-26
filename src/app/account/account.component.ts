import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  countclick: any;
  userData:any;
  curentuserinfo: any;
  curentkey:any
  useremail: any;
  useruid: any;
  uid: any = localStorage.getItem('currentUser');

  constructor(private authservice:AuthService) { }

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
        this.useruid = a.userid;
      });
      console.log(this.countclick);
    });
  }

  logout() {
    this.authservice.logout();
  }

}
