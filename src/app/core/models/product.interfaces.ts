// src/app/core/models/product.interfaces.ts
export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  brand?: string;
  category?: string;
  images?: string[];
  thumbnail?: string;
  rating?: number;
  stock?: number;
}

export interface CategoryProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ShopCategory {
  name: string;
  slug: string;
  image: string; // Representative image for category
}