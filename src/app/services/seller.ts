import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class Seller {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  // userSignUp(data:signUp){
  //   this.http.post('http://localhost:3000/seller',
  //   data,
  //   {observe:'response'}).subscribe((result)=>{
  //     console.warn(result)
  //     if(result){
  //       localStorage.setItem('seller',JSON.stringify(result.body))
  //       this.router.navigate(['seller-home'])
  //     }
  //   })
  // } 
  // userSignUp(data:signUp){
  //  return this.http.post('http://localhost:3000/seller',
  //   data,
  //   {observe:'response'}
    // .subscribe((result)=>{
    //   console.warn(result)
    //   if(result){
    //     localStorage.setItem('seller',JSON.stringify(result.body))
    //     this.router.navigate(['seller-home'])
    //   }
    // }
  //   )
  // } 

  userSignUp(data: signUp) {
    console.log('serviceData', data);
    return this.http.post("http://localhost:3000/seller", data);
  }

  reloadSeller(): void {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login): void {
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((result: any) => {
        console.log(result);

        if (result && result.body && result.body.length === 1) {
          this.isLoginError.emit(false);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home']);

        } else {
          this.isLoginError.emit(true);
        }
      })
  }
}