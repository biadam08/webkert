import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Product } from 'src/app/shared/models/Product';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  user?: User;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.fetchUserData();
  }

  placeOrder() {
    if (this.cartItems.length > 0) {
      this.orderService.placeOrder(this.cartItems).subscribe({
        next: (orderId) => {
          console.log('A megrendelés sikeresen rögzítve, orderId:', orderId);
          this.cartService.clearCart();
          this.router.navigate(['/cart/successful', orderId]);
        },
        error: (error) => {
          console.log('Be kell jelentkezni a rendeléshez');
           this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
        }
      });
    }
  }

  clearCart(){
    this.cartService.clearCart();
    this.cartItems = [];
  }

  fetchUserData(): void {
    this.authService.isUserLoggedIn().subscribe(authUser => {
      if (authUser) {
        const userId = authUser.uid;
        this.userService.getUserById(userId).subscribe((userData: User | undefined) => {
          if (userData) {
            this.user = userData;
          }
        });
      }
    });
  }

}