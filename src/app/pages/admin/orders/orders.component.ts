import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Order } from 'src/app/shared/models/Order';
import { User } from 'src/app/shared/models/User';
import { OrderService } from 'src/app/shared/services/order.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Observable<Order[]> | undefined;
  users: { [key: string]: User } = {};

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.orders = this.orderService.getAllOrders();
    this.userService.getAll().pipe(
      map(users => {
        users.forEach(user => {
          this.users[user.email] = user;
        });
      })
    ).subscribe();
  }

}
