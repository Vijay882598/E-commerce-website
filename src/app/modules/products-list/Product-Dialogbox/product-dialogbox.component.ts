import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../components/button/button.component';
import { TostServiceService } from '../../../core/service/Tost-service/tost-service.service';
import { Router } from '@angular/router';
import { Product } from '../../../core/models/product.interfaces';
import * as AOS from 'aos';

@Component({
  selector: 'app-product-dialogbox',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-dialogbox.component.html',
  styleUrl: './product-dialogbox.component.scss'
})
export class ProductDialogboxComponent implements OnChanges {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) isOpen = false;

  @Output() close = new EventEmitter<void>();

  constructor(
    private toast: TostServiceService,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      setTimeout(() => AOS.refresh(), 100);
    }
  }

  closeDialog(): void {
    this.close.emit();
  }

  addToCart(product: Product): void {
    if (!product?.id) {
      this.toast.show('Invalid product', 'error');
      return;
    }

    let cart: Array<{
      id: number;
      title: string;
      price: number;
      thumbnail?: string;
      quantity: number;
    }> = JSON.parse(localStorage.getItem('cart') || '[]');

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
      this.toast.show(`${product.title} quantity updated!`, 'success');
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail || product.images?.[0],
        quantity: 1
      });
      this.toast.show(`${product.title} added to cart!`, 'success');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.closeDialog();
    this.router.navigate(['/carts/cart']);
  }

  buyNow(product: Product): void {
    if (!product?.id) {
      this.toast.show('Invalid product', 'error');
      return;
    }

    const buyNowData = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail || product.images?.[0],
      quantity: 1
    };

    localStorage.setItem('buyNowProduct', JSON.stringify(buyNowData));
    this.toast.show(`Redirecting to payment for ${product.title}...`, 'success');

    this.closeDialog();
    this.router.navigate(['/payment']);
  }
}