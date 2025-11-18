export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface Offer {
  productId: string;
  quantity: number;
  offerPrice: number;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PricingTable {
  products: Product[];
  offers: Offer[];
}
