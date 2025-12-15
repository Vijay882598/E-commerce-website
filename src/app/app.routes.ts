import { Routes } from '@angular/router';
import { LoginComponent } from './modules/Auth/login/login.component';
import { SignupComponent } from './modules/Auth/signup/signup.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
    //   {
    //     path:'',
    //     loadChildren:() => import('./modules/Home/home.routes').then(r => r.PRODUCT_LIST_ROUTES)
    // },
    // {
    //     path:'products',
    //     loadChildren:() => import('./modules/products-list/product-list.routes').then(r => r.PRODUCT_LIST_ROUTES)
    // },
    //  {
    //     path:'carts',
    //     loadChildren:() => import('./modules/cart-list/cart-list.routes').then(r => r.CART_LIST_ROUTES)
    // },
    //  {
    //     path:'payment',
    //     loadChildren:() => import('./modules/payment-cart/payment-cart.routes').then(r => r.PAYMENT_CART_ROUTES)
    // },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/Home/home.routes').then(r => r.PRODUCT_LIST_ROUTES)
            },
            {
                path: 'products',
                loadChildren: () => import('./modules/products-list/product-list.routes').then(r => r.PRODUCT_LIST_ROUTES)
            },
            {
                path: 'carts',
                loadChildren: () => import('./modules/cart-list/cart-list.routes').then(r => r.CART_LIST_ROUTES)
            },
            {
                path: 'payment',
                loadChildren: () => import('./modules/payment-cart/payment-cart.routes').then(r => r.PAYMENT_CART_ROUTES)
            },
        ]
    },
    // ================= AUTH ROUTES =================
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
