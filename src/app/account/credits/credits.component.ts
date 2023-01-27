import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import { UsersList } from 'src/app/model/users';


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
  yourplan: any;
  percenvalue:any;
  uid: any = localStorage.getItem('currentUser');
  plandurations: any = [{"name": "Montly", "price":"10", "checkedone": true},{"name": "Yearly", "price":"100", "checkedone": false}];
  plantypes = this.plandurations[0];
  
  paymentHandler: any = null;
  successpayment:boolean = false;
  failurepayment:boolean = false;
  userObject: UsersList = {
    creditCount: 0,
    email: '',
    userid: '',
    plan:'',
  }
  dayss: any;
  planexpry:any;
  priorDate:any;

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
        this.yourplan = a.plan;
        this.planexpry = a.planExpiry;
      });
      this.percenvalue = ((this.countclick/5)*100).toFixed(2)
    });
    this.invokeStripe();
  }
// payment 
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MTp1CLgKThmRY6gRUyWYh67ba0h4GsB5e3gsPnFuDxzC4wlK8g5P4kdWNKUK5WARtukgsxkSTar1ZPoV4hjxQbd00P1QwQLmJ',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        // paymentstripe(stripeToken);
        paymentStrip(stripeToken);
      },
    });
    // const paymentstripe = (stripeToken: any) => {
    //   this.authservice.processPayment(stripeToken, amount).then((data:any) => {
    //    console.log(data);
    //   });
    // }
    const paymentStrip = (stripeToken: any) => {
      this.authservice.makepayment(stripeToken).subscribe((data:any) => {
       console.log(data);
       if(data.data === "success") {
        this.successpayment = true;
        this.updateuserdetails();
       } else {
        this.failurepayment = true;
       }
      });
    }
    paymentHandler.open({
      name: 'Recruitryte',
      email : this.useremail,
      description: 'Make payment to subscribe Premium plan',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MTp1CLgKThmRY6gRUyWYh67ba0h4GsB5e3gsPnFuDxzC4wlK8g5P4kdWNKUK5WARtukgsxkSTar1ZPoV4hjxQbd00P1QwQLmJ',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.paymentHandler.close();
  }

  expiryDate() {
    if(this.plantypes.name = "Yearly") {
      this.dayss = 365;
    } else {
      this.dayss = 30;
    }
    let dayse = 30;
    const today = new Date();
    this.priorDate = new Date(new Date().setDate(today.getDate() + dayse));
  }

  // payment end 
  updateuserdetails() {
    this.userObject.creditCount = 5;
    this.userObject.email = this.useremail;
    this.userObject.userid = this.useruid;
    this.userObject.plan = 'premium';
    this.expiryDate();
    const time = this.priorDate;
    if (this.userObject) {
      this.authservice.updateuserInfo(this.curentkey.key, this.userObject)
        .then(() => {
            console.log('updated');
          });
      this.authservice.updateuserInfo(this.curentkey.key, { planExpiry: time});
    }
  }

}
function moment(date_string: any) {
  throw new Error('Function not implemented.');
}

