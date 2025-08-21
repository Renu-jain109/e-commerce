import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  templateUrl: './seller-update-product.html',
  styleUrl: './seller-update-product.css'
})
export class SellerUpdateProduct implements OnInit {

  productData: undefined | product;
  productMessage: string | undefined;
  constructor(private route: ActivatedRoute, private productService: Product,private router: Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productService.getProduct(productId).subscribe((data) => {
      this.productData = data;
    })
  }
  updateProduct(data: product) {
    if(this.productData){
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if(result){
        this.productMessage = "Product is successfully updated";
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
      this.router.navigate(['/seller-home']);
    },2000)

  }
}
