import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  create(user: User): Promise<void> {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAll(): Observable<User[]>{
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  updateUser(userId: string, updatedUser: User): Promise<void> {
    return this.afs.collection<User>(this.collectionName).doc(userId).update(updatedUser);
  }

  delete(userId: string): Promise<void> {
    return this.afs.collection<User>(this.collectionName).doc(userId).delete();
  }
  
  getUserById(userId: string): Observable<User | undefined>{
    return this.afs.collection<User>(this.collectionName).doc(userId).valueChanges();
  }
}