import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {

  cartData = new EventEmitter<product[] | []>();
  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post("http://localhost:3000/products", data);
  }

  productList() {
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    console.log(product);
    return this.http.put(`http://localhost:3000/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=4`);

  }

  trendyProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`);
  }


  searchProducts(query: string) {
    // Get all products and filter on the client side for more flexible searching
    return this.http.get<product[]>('http://localhost:3000/products').pipe(
      map((products: product[]) => {
        if (!query) return [];
        const searchTerm = query.toLowerCase().trim();
        return products.filter((product: product) => {
          const nameMatch = product.name?.toLowerCase().includes(searchTerm) || false;
          const categoryMatch = product.category?.toLowerCase().includes(searchTerm) || false;
          const descMatch = product.description?.toLowerCase().includes(searchTerm) || false;
          const colorMatch = product.color?.toLowerCase().includes(searchTerm) || false;

          return nameMatch || categoryMatch || descMatch || colorMatch;
        });
      })
    );
  }

  localAddToCart(data: product) {

    let cartData = [];
    let localCart = localStorage.getItem('localCart');

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);

    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);

    }
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);

    }
  };

  addToCart(cartData: cart) {
    return this.http.post("http://localhost:3000/cart", cartData);
  }

  getCartList(userId: string) {

    return this.http.get<product[]>(`http://localhost:3000/cart?userId=` + userId
      , { observe: 'response' }).subscribe((result) => {
        console.log('result:', result);

        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  };

  removeToCart(cartId: string) {
    return this.http.delete(`http://localhost:3000/cart/` + cartId);
  };

  currentCart() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    return this.http.get<cart[]>(`http://localhost:3000/cart?userId=` + userId)
  }

  orderNow(data: order) {
    return this.http.post("http://localhost:3000/orders", data);
  }

  orderList() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    return this.http.get<order[]>("http://localhost:3000/orders?userId=" + userId);
  }
  deleteCartItem(cartId: string) {
    return this.http.delete(`http://localhost:3000/cart/${cartId}`, { observe: 'response' }).subscribe((result) => {
      if (result) {
        this.cartData.emit([]);
      }
    })
  }

  cancelOrder(orderId: string) {
    return this.http.delete(`http://localhost:3000/orders/${orderId}`);
  } 
}
