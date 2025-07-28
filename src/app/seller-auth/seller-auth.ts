import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css'
})
export class SellerAuth implements OnInit {

  constructor(private sellerService: Seller) { }
  router = inject(Router);

  ngOnInit(): void {
  }

  signUp(data: signUp): void {
    this.sellerService.userSignUp(data).subscribe((res) => {

      if (res) {
        this.router.navigate(["/seller-home"]);
      }
    });
  }
}
