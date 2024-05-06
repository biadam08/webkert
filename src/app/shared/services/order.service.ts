import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map, switchMap, take } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  cartItems: Product[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }

  placeOrder(cartItems: any[]): Observable<string> {
    return this.authService.isUserLoggedIn().pipe(
      switchMap(user => {
        if (user) {
          const order = {
            email: user.email,
            products: cartItems,
            datePlaced: new Date(),
          };
          return this.afs.collection('Orders').add(order).then(docRef => {
            return docRef.id; 
          });
        } else {
          throw new Error('A felhasználónak be kell jelentkeznie a megrendeléshez.');
        }
      })
    );
  }

 getOrderById(orderId: string): Observable<Order | undefined> {
    return this.afs.collection<Order>('Orders').doc(orderId).valueChanges();
  }

  getAllOrders(): Observable<Order[]> {
    return this.afs.collection<Order>('Orders', ref => ref.orderBy('datePlaced', 'desc')).valueChanges();
  }
 
  
    
}
