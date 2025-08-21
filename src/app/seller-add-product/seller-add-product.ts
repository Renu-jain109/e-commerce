import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Product } from '../services/product';
import { product } from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-add-product',
  imports: [FormsModule],
  templateUrl: './seller-add-product.html',
  styleUrl: './seller-add-product.css'
})
export class SellerAddProduct implements OnInit {

  addProductMessage:string | undefined;
  constructor(private productService:Product ,private router:Router) { }

  ngOnInit(): void {
    
  }

  addProduct(data: product){
    this.productService.addProduct(data).subscribe((result) => {
      console.log('product', result);
      
      if(result){
        this.addProductMessage = "Product is successfully added";
        this.router.navigate(['/seller-home']);

      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      },3000)
    })
    
  }

}
