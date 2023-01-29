import { Component, Input, OnInit } from '@angular/core';
import { UsersList } from '../../model/users';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  @Input() creditleft: any;
  name: any;


  ngOnInit(): void {

   
  }

  logout() {
    this.authService.logout();
  }

 

}
