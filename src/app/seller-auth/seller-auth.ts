import { Component, inject, OnInit, resource } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../services/seller';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css'
})
export class SellerAuth implements OnInit {

  showLogin = false;
  authError:string = '';
  constructor(private sellerService: Seller, private router: Router) { }
  // router = inject(Router);

  ngOnInit(): void {
    this.sellerService.reloadSeller()
  }

  signUp(data: signUp): void {
    console.warn(data);
    this.sellerService.userSignUp(data).subscribe((result: any) => {
      console.log(result);
      if(result){
        // localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['/seller-home'])
      }
      
    });
  }

  // signUp(data: signUp): void {
  //   console.log('data', data);
  //   this.authError = '';
  //   this.sellerService.userSignUp(data).subscribe((result:any) => {
  //     if(result){
  //       localStorage.setItem('seller',JSON.stringify(result.body))
  //       this.showLogin = true;
  //     }
  //   })
  // }

  openLogin(){
this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }

  login(data: login): void {
    // this.authError = '';
    this.sellerService.userLogin(data);
    this.sellerService.isLoginError.subscribe((error) => {
      if(error){
        this.authError = 'Email or Password is not correct';
      }
    })
    
  }

}
