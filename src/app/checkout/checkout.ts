import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../services/product';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private productService: Product, private router: Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      console.log('Cart Data:', this.cartData);

      result.forEach((item) => {
        let quantity = Number(item.quantity) || 1;
        let itemPrice = Number(item.price.toString().replace(/,/g, '')) || 0;
        price = price + (itemPrice * quantity);

      })
      // this.totalPrice = price + (price / 10) + 100 - (price / 10);
            // this.totalPrice = Number((price - discount + this.priceSummary.tax + this.priceSummary.deliveryCharges).toFixed(2)); // 2 decimal

            const discount = price / 10; // 10% discount
      const tax = price / 10;     // 10% tax
      const deliveryCharges = 100;
      this.totalPrice = Number((price + tax + deliveryCharges - discount).toFixed(2)); // Adjusted formula
    

    })
  }

  orderNow(data: order) {
    console.warn(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItem(item.id);
        }, 700);
      })
      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Your order has been placed successfully";
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 4000);
        }
      })
    }
  }
}
