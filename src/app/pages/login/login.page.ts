import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string;
  
  constructor(private auth:AuthService,
              private router: Router, ) { }

  ngOnInit() {
   
  }

  //do login
  login() {
      this.auth.login(this.email,this.password)
  }
}
