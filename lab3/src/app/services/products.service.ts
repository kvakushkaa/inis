import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'UI Kit Pro',
      price: 89,
      imageUrl: 'assets/products/ui-kit-pro.png',
      rating: 4.8,
      description: 'Design system pack',
      category: 'UI KIT',
      accent: '#0F766E',
    },
    {
      id: 2,
      name: 'Icon Bundle 240',
      price: 35,
      imageUrl: 'assets/products/icon-bundle.png',
      rating: 4.6,
      description: 'Vector icon set',
      category: 'ICONS',
      accent: '#F59E0B',
    },
    {
      id: 3,
      name: 'Synthwave Presets',
      price: 55,
      imageUrl: 'assets/products/synthwave.png',
      rating: 4.9,
      description: 'Audio preset pack',
      category: 'AUDIO',
      accent: '#5B21B6',
    },
    {
      id: 4,
      name: 'Motion Pack Lite',
      price: 42,
      imageUrl: 'assets/products/ui-kit-pro.png',
      rating: 4.5,
      description: 'UI animation kit',
      category: 'MOTION',
      accent: '#115E59',
    },
  ];

  getData(): Product[] {
    return this.products;
  }
}
