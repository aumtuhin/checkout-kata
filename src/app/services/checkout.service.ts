import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private cart = new Map<string, number>();
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  public total$ = this.totalSubject.asObservable();

  constructor(private productService: ProductService) {}

  scanItem(productId: string): void {
    const currentQty = this.cart.get(productId) || 0;
    this.cart.set(productId, currentQty + 1);
    this.updateCart();
  }

  removeItem(productId: string): void {
    const currentQty = this.cart.get(productId) || 0;
    if (currentQty > 1) {
      this.cart.set(productId, currentQty - 1);
    } else {
      this.cart.delete(productId);
    }
    this.updateCart();
  }

  getCartItems(): CartItem[] {
    const items: CartItem[] = [];
    this.cart.forEach((quantity, productId) => {
      const product = this.productService.getProductById(productId);
      if (product) {
        items.push({ product, quantity });
      }
    });
    return items;
  }

  getTotal(items: Map<string, number>): number {
    let total = 0;

    items.forEach((quantity, productId) => {
      total += this.productService.calculatePrice(productId, quantity);
    });

    return total;
  }

  private updateCart(): void {
    const items = this.getCartItems();
    this.cartSubject.next(items);

    const total = this.getTotal(this.cart);
    this.totalSubject.next(total);
  }
}
