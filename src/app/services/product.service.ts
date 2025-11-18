import { Injectable } from '@angular/core';
import { Product, Offer } from '../models/product.model';
import { MOCK_PRODUCTS, MOCK_OFFERS } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = MOCK_PRODUCTS;
  private offers: Offer[] = MOCK_OFFERS;

  getProducts(): Product[] {
    return [...this.products];
  }

  getOffers(): Offer[] {
    return [...this.offers];
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getOfferForProduct(productId: string): Offer | undefined {
    return this.offers.find((o) => o.productId === productId);
  }
}
