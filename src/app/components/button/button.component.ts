import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label = '';
  @Input() disabled = false;

  // 🔥 button types
  @Input() variant: 'primary' | 'secondary' | 'none' = 'none';

  // 🔥 FULL control parent ke paas
  @Input() customClass = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  variantClasses: any = {
    primary: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    none: '' // 👈 Shop Now jaisa custom button
  };

  onClick(event: MouseEvent) {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
