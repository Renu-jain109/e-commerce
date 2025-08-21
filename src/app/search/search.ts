import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../services/product';
import { product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {

  searchResult:undefined | product[]; 
  constructor(private activeRoute:ActivatedRoute, private productService:Product){}

  ngOnInit(): void {
    this.loadSearchResults();
    
    // Subscribe to route parameter changes
    this.activeRoute.paramMap.subscribe((params) => {
      this.loadSearchResults();
    });
  }

  loadSearchResults() {
    const query = this.activeRoute.snapshot.paramMap.get('query');
    if (query) {
      this.productService.searchProducts(query).subscribe((result) => {
        this.searchResult = result;
        console.log(this.searchResult);
        
      });
    } else {
      this.searchResult = undefined;
    }
  }

}
