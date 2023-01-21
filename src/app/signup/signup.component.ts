import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpform!: FormGroup;
  errorMsg!: string;
  email : string = '';
  password : string = '';

  constructor(public formBuilder : FormBuilder, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.signUpform = this.formBuilder.group({
      name : new FormControl(null, [Validators.required]),
      email : new FormControl(null, [Validators.required, Validators.minLength(4)]),
      password : new FormControl(null, [Validators.required]),
    });
  }

  signupNow() {
    console.log(this.email, this.password);
    if(this.email == '') {
      alert('Please enter email');
      return;
    }
    if(this.password == '') {
      alert('Please enter password');
      return;
    }
      // this.router.navigate(['writing-assistant']);
      this.authService.register(this.email, this.password);
      // this.authService.writeUserData().then(() => {

      //   });
    
  }

}
