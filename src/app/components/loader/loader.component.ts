import { Component } from '@angular/core';
import { LoaderServiceService } from '../../core/service/loader-service/loader-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})

export class LoaderComponent {
  constructor(public loader: LoaderServiceService) { }
}
