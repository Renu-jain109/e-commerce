import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule,FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.html',
  styleUrl: './seller-home.css'
})
export class SellerHome implements OnInit {

  productList: undefined | product[];
  productMessage: string | undefined;
  deleteIcon = faTrash;
  editIcon = faEdit;
  constructor(private productService: Product) { }

  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: string) {
    console.log('test id', id);
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result){
        this.productMessage = "Product is deleted";
        this.list();
      }     
    })
    setTimeout(() => {
      this.productMessage = undefined;
    },3000)

  }

  list(){
    this.productService.productList().subscribe((result) => {
      this.productList = result;
    })
  }
}
