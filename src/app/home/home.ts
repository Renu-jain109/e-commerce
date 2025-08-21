import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule,CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  popularProduct: undefined | product[];
  trendyProduct: undefined | product[];
  constructor(private productService: Product){}

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((data) => {
      this.popularProduct = data;
    });
    this.productService.trendyProducts().subscribe((data) => {
      this.trendyProduct = data;
    });
  }
}
