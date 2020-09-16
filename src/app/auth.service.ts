import { AppUsers } from './models/app-users';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.UserInfo>;

  constructor(private afAuth: AngularFireAuth, private activatedRoute: ActivatedRoute,private userService:UserService) {
    this.user$ = this.afAuth.authState

  }

  login() {
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logOut() {
    this.afAuth.auth.signOut();
  }

}
