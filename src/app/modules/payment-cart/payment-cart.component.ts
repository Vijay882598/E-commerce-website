import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import * as AOS from 'aos';
import { RouterLink } from '@angular/router';
import { BuyNowProduct, Order } from '../../core/models/order.interfaces';

@Component({
  selector: 'app-payment-cart',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink],
  templateUrl: './payment-cart.component.html',
  styleUrl: './payment-cart.component.scss'
})
export class PaymentCartComponent implements OnInit, OnDestroy {
  currentProduct: BuyNowProduct | null = null;
  orders: Order[] = [];

  ngOnInit(): void {
    AOS.init({ duration: 800, once: true, offset: 80 });
    this.loadCurrentProduct();
    this.loadOrders();
  }

  ngOnDestroy(): void {
    // AOS.remove();
  }

  private loadCurrentProduct(): void {
    try {
      const stored = localStorage.getItem('buyNowProduct');
      this.currentProduct = stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load buyNowProduct:', error);
      this.currentProduct = null;
    }
  }

  private loadOrders(): void {
    try {
      const stored = localStorage.getItem('orders');
      this.orders = stored ? JSON.parse(stored) : [];
      this.orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    } catch (error) {
      console.error('Failed to load orders:', error);
      this.orders = [];
    }
  }

  payNow(): void {
    if (!this.currentProduct) {
      this.showFeedback('No product selected for payment!', 'error');
      return;
    }

    const newOrder: Order = {
      ...this.currentProduct,
      orderDate: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Completed'
    };
    const updatedOrders = [newOrder, ...this.orders];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    localStorage.removeItem('buyNowProduct');
    this.currentProduct = null;
    this.orders = updatedOrders;
    this.showFeedback(`${newOrder.title} purchased successfully!`, 'success');
  }

  private showFeedback(message: string, type: 'success' | 'error'): void {
    const color = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const feedback = document.createElement('div');
    feedback.className = `fixed top-4 left-1/2 -translate-x-1/2 ${color} text-white px-8 py-4 rounded-xl shadow-2xl z-50 animate-pulse`;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    setTimeout(() => {
      feedback.classList.add('animate-fade-out');
      setTimeout(() => feedback.remove(), 500);
    }, 3000);
  }

  get totalAmount(): number {
    return this.currentProduct ? this.currentProduct.price * this.currentProduct.quantity : 0;
  }
}