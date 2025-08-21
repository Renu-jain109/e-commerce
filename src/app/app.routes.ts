import { Routes } from '@angular/router';
import { Home } from './home/home';
import { SellerAuth } from './seller-auth/seller-auth';
import { PageNotFound } from './page-not-found/page-not-found';
import { SellerHome } from './seller-home/seller-home';
import { SellerAuthGuard } from './seller-auth-guard';
import { SellerAddProduct } from './seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Search } from './search/search';
import { ProductDetails } from './product-details/product-details';
import { UserAuth } from './user-auth/user-auth';
import { CartPage } from './cart-page/cart-page';
import { Checkout } from './checkout/checkout';
import { MyOrders } from './my-orders/my-orders';
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
        component: SellerHome,
        canActivate: [SellerAuthGuard]
    },
    {
        path: "seller-add-product",
        component: SellerAddProduct,
        canActivate: [SellerAuthGuard]
    },
    {
        path: "seller-update-product/:id",
        component: SellerUpdateProduct,
        canActivate: [SellerAuthGuard]
    },
    {
        path: "search/:query",
        component: Search
    },
    {
        path: "details/:id",
        component:ProductDetails
    },
    {
        path: "user-auth",
        component:UserAuth
    },
    {
        path: "cart-page",
        component:CartPage
    },
    {
        path: "checkout",
        component:Checkout
    },
    {
        path: "my-orders",
        component:MyOrders
    },
    {
        path: "**",
        component: PageNotFound

    }
];
