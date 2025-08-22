import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../services/product';
import { cart, product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  popularProduct: undefined | product[];
  trendyProduct: undefined | product[];
  showAllProducts: boolean = false;

  constructor(private productService: Product) { }

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      this.popularProduct = data;
    });
    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProduct = data;
    });
  }


  displayAllProduct() {
    this.showAllProducts = !this.showAllProducts;
    if (this.showAllProducts) {
      this.productService.productList().subscribe((data) => {
        this.popularProduct = data;
        this.trendyProduct = data;
      });
    } else {
      // Optionally reload original popular/trendy products
      this.productService.popularProducts().subscribe((data) => {
        this.popularProduct = data;
      });
      this.productService.trendyProducts().subscribe((data) => {
        this.trendyProduct = data;
      });
    }
  }

  addToCart(product: product) {
    console.log('Product added to local cart:', product);
    
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(product);
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...product,
          userId: userId,
          productId: product.id,
          quantity: 1
        }

        delete cartData.id; // Remove id as it is not needed in the cart

        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId)

          }
        })

      }
    }
  };



