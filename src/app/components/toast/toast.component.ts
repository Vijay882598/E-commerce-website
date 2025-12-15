import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TostServiceService } from '../../core/service/Tost-service/tost-service.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

constructor(public toast: TostServiceService) { }
}
