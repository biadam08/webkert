import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Product } from '../models/Product';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore) {}

  addCategory(name: string): Promise<void> {
    const id = this.afs.createId();
    const name2 = this.removeAccentsAndLowercase(name);
    return this.afs.collection('Categories').doc(id).set({ id, name, name2 });
  }
  
  removeAccentsAndLowercase(input: string): string {
    return input.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  
  getCategories(): Observable<any[]> {
    return this.afs.collection('Categories', ref => ref.orderBy('name')).valueChanges({ idField: 'id' });
  }  

  getCategoryIdByName(categoryName: string): Observable<string | undefined> {
    return this.afs.collection<Category>('Categories', ref => ref.where('name2', '==', categoryName))
      .valueChanges()
      .pipe(
        map(categories => categories.length > 0 ? categories[0].id : undefined)
      );
  }
  
  
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.afs.collection<Product>('Products', ref => ref.where('category', '==', categoryId))
      .valueChanges();
  }

}
