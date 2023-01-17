import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpform!: UntypedFormGroup;
  errorMsg!: string;
  email : string = '';
  password : string = '';

  constructor(public formBuilder : UntypedFormBuilder, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.signUpform = this.formBuilder.group({
      name : new UntypedFormControl(null, [Validators.required]),
      email : new UntypedFormControl(null, [Validators.required, Validators.minLength(4)]),
      password : new UntypedFormControl(null, [Validators.required]),
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
    
  }

}
