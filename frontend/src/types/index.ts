export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  priceCurrent?: string;
  priceOriginal?: string;
  priceContact?: boolean;
  ratingCount: number;
  ratingStars: number;
  badges: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image: string;
}

export interface Promo {
  id: number;
  title: string;
  label: string;
  image: string;
  link: string;
  discount?: string;
  tall?: boolean;
}
