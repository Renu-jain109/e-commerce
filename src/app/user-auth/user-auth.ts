import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { User } from '../services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../services/product';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css'
})
export class UserAuth implements OnInit {

  showLogin: boolean = true;
  authError: string = "";
  constructor(private userService: User, private router: Router, private productService: Product) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }

  signUp(data: signUp) {
    console.log(data);
    this.userService.userSignUp(data)
    // .subscribe((result) => {
    //   if (result) {
    //     localStorage.setItem('user', JSON.stringify(result.body));
    //     this.router.navigate(['/']);
    //   }
    // })

  } login(data: login) {
    this.userService.userLogin(data);
    // Wait for user data to be set in localStorage before syncing cart
    this.userService.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Please enter valid email and password"
      } else {
        // Use a small timeout to ensure localStorage is updated
        setTimeout(() => {
          this.localCartToRemoteCart();
        }, 200);
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    const data = localStorage.getItem('localCart');
    const user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userId
        };

        delete cartData.id; // Remove id as it is not needed in the cart

        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item stored in db');
            }
          })

          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      })

    }
    setTimeout(() => {
      this.productService.getCartList(userId);

    },2000);
  }
}
