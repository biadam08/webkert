import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) {}

  addProduct(productData: any): Promise<void> {
    const productId = this.afs.createId();
    return this.afs.collection('Products').doc(productId).set({
      ...productData,
      id: productId,
      imageUrl: productData.imageUrl || ''
    });
  }  

  getProducts(): Observable<any[]> {
    return this.afs.collection('Products').valueChanges();
  }

  getFirst20Products(): Observable<any[]> {
    return this.afs.collection('Products', ref => ref.limit(20)).valueChanges();
  }

  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.afs.collection<Product>('Products', ref => ref.where('category', '==', categoryId)).valueChanges();
  }

  getProductById(productId: string): Observable<Product | undefined>{
    return this.afs.collection<Product>('Products').doc(productId).valueChanges();
  }
  
}
