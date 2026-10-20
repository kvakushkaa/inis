export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  description?: string;
  category?: string;
  accent?: string;
}
