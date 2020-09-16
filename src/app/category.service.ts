import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories$:any=[];

  constructor(private db: AngularFireDatabase) { }
  getCategories():any[]{
    this.categories$=[];
     this.db.list('/categories').snapshotChanges().forEach(sc=>{
      sc.forEach(data=>{
        let user = data.payload.toJSON()
        user['$key'] =data.key;
        this.categories$.push(user);
      })
    });
    return this.categories$;
  }
}
