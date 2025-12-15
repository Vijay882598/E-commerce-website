import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as AOS from 'aos'
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() slides: string[] = [];
  @Input() autoPlay = true;
  @Input() interval = 3000;
  currentIndex = 0;
  timer: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
    AOS.init()
    if (this.autoPlay) {
      this.startAutoSlide();
    }
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  startAutoSlide() {
    this.timer = setInterval(() => {
      this.next();
    }, this.interval);
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  goToShop() {
    this.router.navigate(['/products', 'Laptops']);
  }
}
