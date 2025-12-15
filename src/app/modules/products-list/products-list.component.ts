// products-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BaseApiService } from '../../core/service/Base-Api/base-api.service';
import { LoaderServiceService } from '../../core/service/loader-service/loader-service.service';
import { TostServiceService } from '../../core/service/Tost-service/tost-service.service';
import { ButtonComponent } from '../../components/button/button.component';
import { ProductDialogboxComponent } from './Product-Dialogbox/product-dialogbox.component';
import { Product, CategoryProductResponse } from '../../core/models/product.interfaces';
import * as AOS from 'aos';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProductDialogboxComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  category: string = '';
  products: Product[] = [];
  selectedProduct: Product | null = null;
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: BaseApiService,
    private loader: LoaderServiceService,
    private toast: TostServiceService
  ) { }

  ngOnInit(): void {
    AOS.init({ once: true, duration: 600 });

    // Subscribe to route params with takeUntil for cleanup
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const slug = params.get('category');
      if (slug) {
        this.category = this.formatCategoryName(slug);
        this.loadProductsByCategory(slug);
      } else {
        this.toast.show('Category not found', 'error');
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProductsByCategory(slug: string): void {
    this.loader.show();
    this.products = []; // Reset products

    this.api
      .callApi<CategoryProductResponse>('GET_PRODUCTS_BY_CATEGORY', null, slug, { limit: 20 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.products = response?.products || [];
          this.loader.hide();

          if (this.products.length === 0) {
            this.toast.show(`No products found in ${this.category}`, 'info');
          }
        },
        error: (err) => {
          console.error('Failed to load products:', err);
          this.products = [];
          this.loader.hide();
          this.toast.show('Failed to load products. Please try again.', 'error');
        }
      });
  }

  viewProduct(product: Product): void {
    this.loader.show();
    this.api
      .callApi<Product>('GET_SINGLE_PRODUCT_DETAIL', null, product.id.toString())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (detailedProduct) => {
          this.selectedProduct = detailedProduct;
          this.showDialog = true;
          this.loader.hide();
        },
        error: (err) => {
          this.loader.hide();
          this.toast.show('Failed to load product details', 'error');
        }
      });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.selectedProduct = null;
  }

  // Optional: Human-readable category name
  private formatCategoryName(slug: string): string {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Optional: TrackBy for performance
  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}