import { AppUsers } from './models/app-users';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db : AngularFireDatabase) { }

  save(user:firebase.UserInfo){
    this.db.object('/users/'+user.uid).update(
      {
        name:user.displayName,
        email : user.email,
        phoneNumber : user.phoneNumber,
      }
    )
  }

  getUser(uid:string){
     this.db.object('/users/'+uid).snapshotChanges().subscribe(data=>{
     let appUser= data.payload.toJSON();
     localStorage.setItem('appUser',JSON.stringify(appUser));
})
}
}
