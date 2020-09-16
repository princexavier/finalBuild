import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private authService :AuthService,private userService : UserService,private router:Router) { }

  canActivate(route, state: RouterStateSnapshot) {

    return this.authService.user$.map(user => {
      if (user){
        this.userService.getUser(user.uid);
        let appUser =JSON.parse( localStorage.getItem('appUser'));
        if(appUser['admin']){
          return true;
        }
        else 
        {
          this.router.navigate([''],{queryParams:{returnUrl:state.url}});
        }
      }
      else this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});

      return false;
    });
  }
}
