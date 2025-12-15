import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { BaseApiService } from './core/service/Base-Api/base-api.service';
import { LoaderServiceService } from './core/service/loader-service/loader-service.service';
import { TostServiceService } from './core/service/Tost-service/tost-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,RouterOutlet, LoaderComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-app';
    categories: any[] = [];
   sidebarOpen = false;
  constructor(   private api: BaseApiService,
    private loader: LoaderServiceService,
    private toast: TostServiceService){}
      ngOnInit() {
    this.loadCategories();
  }
     loadCategories() {
    this.loader.show();

    this.api.callApi('GET_CATEGORIES').subscribe({
      next: (res: any) => {
        const normalizedCats = (res || []).map((cat: any) => ({
          name: cat.name || cat,
          slug:
            typeof cat === 'object'
              ? cat.slug
              : cat.toLowerCase().replace(/\s+/g, '-')
        }));

        this.categories = normalizedCats;
        this.loader.hide();
      },
      error: () => {
        this.toast.show('Failed to load categories', 'error');
        this.loader.hide();
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
