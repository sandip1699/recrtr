import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  countclick: any;
  userData:any;
  curentuserinfo: any;
  curentkey:any
  useremail: any;
  useruid: any;
  percenvalue:any;
  uid: any = localStorage.getItem('currentUser');
 
  plandurations: any = [{"name": "Montly", "price":"10", "checkedone": true},{"name": "Yearly", "price":"100", "checkedone": false}];
  plantypes = this.plandurations[0];

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
      this.percenvalue = ((this.countclick/5)*100).toFixed(2)
    });
  }
}
