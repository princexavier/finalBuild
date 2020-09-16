import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopcart';

  constructor(private authService : AuthService,private route: Router,private userService : UserService){
    authService.user$.subscribe(user=>{
      if(user){
        this.userService.save(user);
        this.userService.getUser(user.uid);
        let returnUrl = localStorage.getItem('returnUrl');
        this.route.navigateByUrl(returnUrl);
      }
    })
  }
}
