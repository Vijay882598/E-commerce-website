// cart-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import * as AOS from 'aos';
import { CartItem } from '../../core/models/cart.interfaces';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss'
})
export class CartListComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
    AOS.init({ duration: 700, once: true, offset: 100 });
  }

  ngOnDestroy(): void {}

  private loadCart(): void {
    try {
      const stored = localStorage.getItem('cart');
      this.cartItems = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load cart:', error);
      this.cartItems = [];
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  increaseQty(index: number): void {
    this.cartItems[index].quantity += 1;
    this.saveCart();
  }

  decreaseQty(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.saveCart();
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.10;
  }

  get shipping(): number {
    return this.subtotal > 100 ? 0 : 10;
  }

  get total(): number {
    return this.subtotal + this.tax + this.shipping;
  }

  get itemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }


  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }
  redirect() {
    this.router.navigate(['/'])
  }
}