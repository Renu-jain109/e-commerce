import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { PageNotFound } from './page-not-found/page-not-found';
import { SellerHome } from './seller-home/seller-home';
export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "seller-auth",
        component: SellerAuth
    },
    {
        path: "seller-home",
        component: SellerHome
    },
    {
        path: "**",
        component: PageNotFound

    }
];
