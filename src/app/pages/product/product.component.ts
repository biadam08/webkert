import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/Product';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId: string = '';
  cartSuccess: { [productId: string]: boolean } = {};
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.productService.getProductById(productId).subscribe(
          product => {
            this.product = product;
          },
          error => {
            console.log('Nincs ilyen ID-jú termék');
          }
        );
      }
    });
  }
  

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartSuccess[product.id] = true;
    setTimeout(() => this.cartSuccess[product.id] = false, 5000);
  }

}
