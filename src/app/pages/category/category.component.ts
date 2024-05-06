import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryName: string = '';
  products?: Observable<Product[]>;
  cartSuccess: { [productId: string]: boolean } = {};
  private routeSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService : CategoryService, private cartService : CartService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryName = params['id'];
      if (categoryName) {
        this.categoryService.getCategoryIdByName(categoryName).subscribe(categoryId => {
          if (categoryId) {
            this.products = this.productService.getProductsByCategory(categoryId);
          } else {
            console.error('Nincs ilyen kategória.');
          }
        });
      } else {
        console.error('Nincs kategória név.');
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartSuccess[product.id] = true;
    setTimeout(() => this.cartSuccess[product.id] = false, 5000);
  }
  
}
