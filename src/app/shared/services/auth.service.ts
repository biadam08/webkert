import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  collectionName = 'Users';

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  saveAdditionalUserInfo(uid: string, additionalUserInfo: any): Promise<void> {
    return this.afs.collection('users').doc(uid).set(additionalUserInfo, { merge: true });
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  getUserRole(uid: string) {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', uid))
      .valueChanges()
      .pipe(
        map(users => users.length > 0 ? users[0].role : null)
      );
  }
}