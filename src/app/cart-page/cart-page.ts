import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryCharges: 0,
    total: 0

  }

  constructor(private productService: Product, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails();
  };


  loadDetails() {
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;

      let price = 0;
      result.forEach((item) => {
        let quantity = Number(item.quantity) || 1;
        let itemPrice = Number(item.price.toString().replace(/,/g, '')) || 0;
        price = price + (itemPrice * quantity);

      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.deliveryCharges = 100;
      // this.priceSummary.total = Math.round(price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.deliveryCharges);
      // this.priceSummary.total =price + (price / 10) + 100 - (price / 10);
      this.priceSummary.total = Number((price - this.priceSummary.discount + this.priceSummary.tax + this.priceSummary.deliveryCharges).toFixed(2)); // 2 decimal


      if (this.cartData.length === 0) {
        this.router.navigate(['/']);
      }
    })

  }

  removeToCart(cartId: string | undefined) {
    cartId && this.productService.removeToCart(cartId).subscribe((result) => {
      this.loadDetails();
    })

  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

}



