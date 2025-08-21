import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { order } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders implements OnInit {

  orderData: order[] | undefined;
  constructor(private productService: Product) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  
 cancelOrder(orderId: string | undefined) {
  orderId && this.productService.cancelOrder(orderId).subscribe((result)=>{

    if(result){
      this.getOrderList();
    }
  })
}

getOrderList(){
    this.productService.orderList().subscribe((result) => {
      this.orderData = result;
    })

}

}

