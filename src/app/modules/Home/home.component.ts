import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import { BaseApiService } from '../../core/service/Base-Api/base-api.service';
import { LoaderServiceService } from '../../core/service/loader-service/loader-service.service';
import { TostServiceService } from '../../core/service/Tost-service/tost-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../layout/slider/slider.component';
import { ButtonComponent } from '../../components/button/button.component';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/service/Auth-service/auth.service';
import {
  Category,
  Product,
  HeroDeal,
  Feature,
  StaticCategory
} from '../../core/models/home.interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SliderComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  categories: Category[] = [];
  products: Product[] = [];
  fallbackImage = 'https://via.placeholder.com/400?text=No+Image';

  sliderImages = [
    './slider/S1.png',
    './slider/S2.png',
    './slider/S3.png'
  ];

  // Hero Deals Section
  heroDeals: HeroDeal[] = [
    {
      image: './Home-section2/homes2(1).jpg',
      alt: 'Premium Smartphones Holiday Deals',
      gradient: 'bg-gradient-to-br from-red-600/90 via-orange-600/80 to-yellow-600/70',
      tag: 'Holiday Deals',
      title: 'Up to <span class="block text-6xl lg:text-7xl animate-pulse">30% off</span>',
      subtitle: 'Selected Smartphone Brands',
      buttonColor: 'text-red-600',
      category: 'Mobile Accessories'
    },
    {
      image: './Home-section2/home2(2).jpg',
      alt: 'Premium Wireless Headphones',
      gradient: 'bg-gradient-to-tr from-purple-700/90 via-pink-600/80 to-indigo-600/70',
      tag: 'New Arrival',
      title: 'Take Your<br><span class="text-5xl lg:text-6xl">Sound Anywhere</span>',
      subtitle: 'Top Headphone Brands',
      buttonColor: 'text-purple-600',
      category: 'Mens Watches'
    },
    {
      image: './Home-section2/home2(3).jpg',
      alt: 'Premium Laptops Deals',
      gradient: 'bg-gradient-to-bl from-blue-700/90 via-cyan-600/80 to-teal-600/70',
      tag: 'Limited Offer',
      title: 'Up to <span class="block text-6xl lg:text-7xl animate-pulse">40% off</span>',
      subtitle: 'Premium Laptops & Ultrabooks',
      buttonColor: 'text-blue-600',
      category: 'Laptops'
    },
    {
      image: './Home-section2/home2(4).jpg',
      alt: 'Smartwatches & Accessories',
      gradient: 'bg-gradient-to-tl from-green-700/90 via-emerald-600/80 to-lime-600/70',
      tag: 'Hot Deals',
      title: 'Starting at<br><span class="text-5xl lg:text-6xl">$99</span>',
      subtitle: 'Smartwatches & Wearables',
      buttonColor: 'text-green-600',
      category: 'Mens Watches'
    }
  ];

  // Features Section
  features: Feature[] = [
    { icon: './Home-section2/pickup.jpg', title: 'Curbside Pickup', desc: 'Convenient & contactless collection' },
    {
      icon: './Home-section2/free.jpg',
      title: 'Free Shipping<br class="sm:hidden"><span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">on orders over $50</span>',
      desc: 'Fast delivery, no extra cost'
    },
    { icon: './Home-section2/low-price.jpg', title: 'Low Prices<br class="sm:hidden"> Guaranteed', desc: 'Best deals every day' },
    { icon: './Home-section2/service.jpg', title: 'Available to You<br class="sm:hidden"> 24/7', desc: 'Support whenever you need' }
  ];

  // Static Categories Grid
  staticCategories: StaticCategory[] = [
    { name: 'Laptops', image: 'https://media.istockphoto.com/id/1283444740/vector/device-of-laptop-computer-icon.jpg?s=612x612&w=0&k=20&c=U1CC9g_m1Hq0QkQ2x__Cb1pj4D9MGLjgmTYykCCciM8=', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'Smartphones', image: 'https://www.shutterstock.com/image-vector/mobile-phone-icon-set-concept-260nw-2475905531.jpg', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'Headphones', image: 'https://www.shutterstock.com/image-vector/headphone-symbol-clip-art-flat-260nw-2500720143.jpg', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'Cameras', image: 'https://www.shutterstock.com/image-vector/photo-camera-icon-set-icons-260nw-2652887339.jpg', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    // {
    //   name: 'Sale',
    //   svg: { class: 'w-24 h-24 m-auto text-white', path: 'M3 3h2l.4 2M7.4 5h9.2l1.4 8H6l1.4-8zM7.4 13l-1.4 6h12l-1.4-6M9 13v6m6-6v6' },
    //   containerClass: 'w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full',
    //   highlight: true,
    //   badge: 'HOT SALE'
    // },
    { name: 'Laptops', image: 'https://media.istockphoto.com/id/1283444740/vector/device-of-laptop-computer-icon.jpg?s=612x612&w=0&k=20&c=U1CC9g_m1Hq0QkQ2x__Cb1pj4D9MGLjgmTYykCCciM8=', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },

    { name: 'Smartwatches', image: 'https://www.shutterstock.com/image-vector/smart-watch-icon-sign-mobile-260nw-2349401701.jpg', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'Gaming', image: 'https://media.istockphoto.com/id/1270030205/vector/controller-icon-representing-the-game-or-console.jpg?s=612x612&w=0&k=20&c=RNx91lsMV5jqodt8AY9D5HNC6NHDnpPC948jdSKD4pU=', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'Tablets', image: 'https://www.shutterstock.com/image-vector/tablet-icon-vector-ipad-style-260nw-1176920509.jpg', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'TVs', image: 'https://media.istockphoto.com/id/2148656073/vector/tv-with-remote-icon-vector-best-flat-icon.jpg?s=612x612&w=0&k=20&c=G8byInsbQKprj2FaiT76sEvhSvsMdwt7U2LA2Sz9xrQ=', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' },
    { name: 'Accessories', image: 'https://www.shutterstock.com/image-vector/connector-cable-icon-set-600nw-2618675585.jpg', containerClass: 'w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white rounded-full' }
  ];

  constructor(
    private api: BaseApiService,
    private loader: LoaderServiceService,
    private toast: TostServiceService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    AOS.init({ once: true, duration: 800 });
    this.loadInitialData();
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData(): void {
    this.loader.show();

    forkJoin({
      categories: this.api.callApi<any[]>('GET_CATEGORIES').pipe(
        catchError(() => {
          this.toast.show('Failed to load categories', 'error');
          return of([]);
        })
      ),
      products: this.api.callApi<any>('GET_PRODUCTS').pipe(
        catchError(() => {
          this.toast.show('Failed to load products', 'error');
          return of({ products: [] });
        })
      )
    })
      .pipe(
        finalize(() => this.loader.hide()),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: ({ categories, products }) => {
          this.categories = (categories || []).map((cat: any) => ({
            name: cat.name || (typeof cat === 'string' ? cat : 'Unknown'),
            slug: typeof cat === 'object' ? cat.slug : cat.toLowerCase().replace(/\s+/g, '-')
          }));

          this.products = (products?.products || []).slice(0, 30);

          this.toast.show('Home page loaded successfully', 'success');
        },
        error: () => this.toast.show('Something went wrong', 'error')
      });
  }

  goToCategory(slug: string): void {
    this.router.navigate(['/products', slug]);
  }

  AddTOCart(product: Product): void {
    this.authService.requireAuth(() => {
      let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail || product.images?.[0],
          quantity: 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.toast.show(`${product.title} added to cart!`, 'success');
      this.router.navigate(['/carts/cart']);
    });
  }

  trackByProductId(index: number, item: Product): number {
    return item.id;
  }
}