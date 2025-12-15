// src/app/core/models/home.interfaces.ts

export interface Category {
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images?: string[];
  originalPrice?: number;
  quantity?: number;
}

export interface HeroDeal {
  image: string;
  alt: string;
  gradient: string;
  tag: string;
  title: string; // Supports HTML via [innerHTML]
  subtitle: string;
  buttonColor: string; // e.g., 'text-red-600'
  category: string;
}

export interface Feature {
  icon: string;
  title: string; // Supports HTML via [innerHTML]
  desc: string;
}

export interface StaticCategory {
  name: string;
  image?: string;
  svg?: {
    class: string;
    path: string;
  };
  containerClass: string;
  highlight?: boolean;
  badge?: string;
}