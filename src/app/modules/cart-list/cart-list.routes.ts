import { Routes } from "@angular/router";
import { CartListComponent } from "./cart-list.component";

export const CART_LIST_ROUTES: Routes = [
    {
        path: 'cart',
        component: CartListComponent
    }
]