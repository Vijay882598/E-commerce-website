// base-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_LIST } from '../../config/api.config';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private http: HttpClient) { }

  callApi<T = any>(
    apiName: string,
    body?: any,
    param?: string,
    options?: { limit?: number; skip?: number }
  ): Observable<T> {
    const api = API_LIST.find(a => a.name === apiName && a.status === true);

    if (!api) {
      return throwError(() => new Error(`API "${apiName}" not found or disabled`));
    }

    let url = api.url;

    // Handle path parameter (e.g., /category/smartphones)
    if (param) {
      url = `${url}/${encodeURIComponent(param)}`;
    }

    // Build query params using HttpParams (cleaner & safer)
    let params = new HttpParams();
    if (options?.limit !== undefined) {
      params = params.set('limit', options.limit.toString());
    }
    if (options?.skip !== undefined) {
      params = params.set('skip', options.skip.toString());
    }

    console.log('API Call:', api.method, url, params.toString() || 'no params');

    switch (api.method.toUpperCase()) {
      case 'GET':
        return this.http.get<T>(url, { params });

      case 'POST':
        return this.http.post<T>(url, body, { params });

      case 'PUT':
        return this.http.put<T>(url, body, { params });

      case 'DELETE':
        return this.http.delete<T>(url, { params });

      default:
      return throwError(() => new Error(`Unsupported HTTP method: ${api.method}`));
    }
  }
}