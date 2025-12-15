import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() categories: any[] = [];
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
   goToCategory(slug: string) {
    // this.router.navigate(['/category', slug]);
    this.close.emit();
  }
}
