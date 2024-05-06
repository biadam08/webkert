import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/shared/services/cart.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  categories?: Observable<any[]>;
  products?: Observable<any[]>;
  cartSuccess: { [productId: string]: boolean } = {};

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    this.products = this.productService.getFirst20Products();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartSuccess[product.id] = true;
    setTimeout(() => this.cartSuccess[product.id] = false, 5000);
  }

  view(product: Product){
    this.router.navigate(['/product/' + product.id]);
  }
}
