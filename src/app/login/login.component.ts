import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private authService:AuthService) { }

  ngOnInit(): void {

  }

  login(){
    this.authService.login();


  }

}
