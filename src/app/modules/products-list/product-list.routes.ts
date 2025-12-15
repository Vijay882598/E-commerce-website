import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products-list.component";

export const PRODUCT_LIST_ROUTES: Routes = [
    {
        path: ':category',
        component: ProductsListComponent
    }
]