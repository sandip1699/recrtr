import { Component, OnInit } from "@angular/core";
import {UntypedFormBuilder,UntypedFormControl,UntypedFormGroup,Validators,} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  errorMsg!: string;
  email : string = '';
  password : string = '';

  constructor(public formBuilder: UntypedFormBuilder, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new UntypedFormControl(null, [Validators.required]),
    });
  }

  // loginNow() {
  //   console.log(this.loginForm.value);
  //   if (this.loginForm.valid) {
  //     this.router.navigate(["writing-assistant"]);
  //   }
  // }
  loginNow() {
    if(this.email == '') {
      alert('Please enter email');
      return;
    }
    if(this.password == '') {
      alert('Please enter password');
      return;
    }
      // this.router.navigate(['writing-assistant']);
      this.authService.login(this.email, this.password);
  }
}
