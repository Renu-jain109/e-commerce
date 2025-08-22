import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../services/product';
import { cart, product } from '../data-type';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {

  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  removeCartData: product | undefined;

  constructor(private activeRoute: ActivatedRoute, private productService: Product) { }

  ngOnInit(): void {

    let productId = this.activeRoute.snapshot.paramMap.get('id');

    productId && this.productService.getProduct(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);

        items = items.filter((item: product) => productId === item.id);
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');

      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result) => {

          let items = result.filter((item: product) => productId === item.productId);

          if (items.length) {
            this.removeCartData = items[0];
            this.removeCart = true;
          }
        })
      }


    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;

      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCart = true;
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id
        }

        delete cartData.id; // Remove id as it is not needed in the cart

        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId)
            this.removeCart = true;

          }
        })

      }
    }
  };

  removeToCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);

    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      this.removeCartData && this.productService.removeToCart(this.removeCartData?.id).subscribe((result) => {
        if (result) {
          this.productService.getCartList(userId);
        }
      })
      this.removeCart = false;

    }
  }
}