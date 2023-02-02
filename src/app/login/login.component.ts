import { Component, OnInit } from "@angular/core";
import {FormBuilder,FormControl,FormGroup,Validators,} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg!: string;
  email : string = '';
  password : string = '';
  dataLoader:boolean = false;

  constructor(public formBuilder: FormBuilder, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl(null, [Validators.required]),
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
      this.dataLoader = false;
      return;
    }
    if(this.password == '') {
      alert('Please enter password');
      this.dataLoader = false;
      return;
    }
    this.dataLoader = true;
      // this.router.navigate(['writing-assistant']);
      this.authService.login(this.email, this.password);
  }
}
