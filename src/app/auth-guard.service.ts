import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private user:UserService) { }

  canActivate(route, state: RouterStateSnapshot) {

    return this.authService.user$.map(user => {
      if (user){
        this.user.getUser(user.uid)
        return true;
      }
      else this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
    });
  }
}
