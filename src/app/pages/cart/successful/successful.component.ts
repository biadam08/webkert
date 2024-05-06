import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.scss']
})
export class SuccessfulComponent implements OnInit {
  orderDetails: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const orderId = this.route.snapshot.params['orderId'];
    this.orderService.getOrderById(orderId).subscribe(
      order => {
        this.orderDetails = order;
      },
      error => {
        console.error('Hiba történt a rendelés lekérésekor:', error);
      }
    );
  }
  
}