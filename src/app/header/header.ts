import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {

  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  cartItems = 0;
  constructor(private route: Router, private productService: Product) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menuType = 'seller';

        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.productService.cartData.emit([]);
  }


  onSearch(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      const searchResult = element.value.trim();
      this.productService.searchProducts(searchResult).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: string) {
    this.route.navigate(["/details/" + id]);
  }


  submitSearch(val: string) {
    this.route.navigate([`/search/${val}`]);
  }


}
