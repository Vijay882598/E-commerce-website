// header.component.ts
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseApiService } from '../../core/service/Base-Api/base-api.service';
import { LoaderServiceService } from '../../core/service/loader-service/loader-service.service';
import { TostServiceService } from '../../core/service/Tost-service/tost-service.service';
import { AuthService } from '../../core/service/Auth-service/auth.service';
import { Subject, takeUntil } from 'rxjs';

export interface Category {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  categories: Category[] = [];
  filteredCategories: Category[] = [];
  cartItemCount = 0;

  isSidebarOpen = false;
  showSearch = false;
  searchText = '';
  isLoggedIn = false;
  userEmail: any | null = null;
  userInitial = 'U'; 
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private api: BaseApiService,
    private loader: LoaderServiceService,
    private toast: TostServiceService,
    private router: Router,
    private autService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.updateCartCount();
    this.checkLoginStatus();
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }
  private checkLoginStatus(): void {
    this.isLoggedIn = this.autService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userEmail = this.autService.getCurrentUserEmail();
      this.userInitial = this.userEmail ? this.userEmail.charAt(0).toUpperCase() : 'U';
    }
  }

  logout(): void {
    this.autService.logout();
    this.isLoggedIn = false;
    this.userEmail = null;
    this.userInitial = 'U';
    this.toast.show('Logged out successfully', 'success');
    this.router.navigate(['/']);
  }
  private loadCategories(): void {
    this.api.callApi<any[]>('GET_CATEGORIES')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.categories = (res || []).map((cat: any) => ({
            name: cat.name || (typeof cat === 'string' ? cat : 'Unknown'),
            slug: typeof cat === 'object' ? cat.slug : cat.toLowerCase().replace(/\s+/g, '-')
          }));
          this.filteredCategories = [...this.categories];
        },
        error: (err) => {
          this.toast.show('Failed to load categories', 'error');
          console.error(err);
        }
      });
  }

  private updateCartCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.length;
  }

  private handleStorageChange(e: StorageEvent): void {
    if (e.key === 'cart') {
      this.updateCartCount();
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    if (!this.isSidebarOpen) {
      this.showSearch = false;
      this.searchText = '';
      this.filteredCategories = [...this.categories];
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        const input = document.querySelector('input[placeholder="Search category..."]') as HTMLInputElement;
        input?.focus();
      }, 100);
    } else {
      this.searchText = '';
      this.filteredCategories = [...this.categories];
    }
  }

  private searchTimeout: any;

  filterCategories(): void {
    clearTimeout(this.searchTimeout);
    const query = this.searchText.trim().toLowerCase();
    this.router.navigate(['products', this.searchText]);
    if (!query) {
      this.filteredCategories = [...this.categories];
    } else {
      this.filteredCategories = this.categories.filter(cat =>
        cat.name.toLowerCase().includes(query)
      );
    }
  }

  goToCategory(category: Category): void {
    this.router.navigate(['/products', category.slug || category.name.toLowerCase().replace(/\s+/g, '-')]);
    this.toggleSidebar();
  }

  pauseScroll(): void {
    this.scrollContainer?.nativeElement.classList.add('pause-scroll');
  }

  resumeScroll(): void {
    this.scrollContainer?.nativeElement.classList.remove('pause-scroll');
  }

  trackByCategory(index: number, category: Category): string {
    return category.slug || category.name;
  }

  goToCart() {
    this.router.navigate(['/carts/cart']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}