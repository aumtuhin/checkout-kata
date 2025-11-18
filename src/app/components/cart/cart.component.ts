import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CartItem } from '../../models/product.model';

import { ButtonComponent } from '../../components/ui/button/button.component';
import { ProductService } from '../../services/product.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(
    private checkoutService: CheckoutService,
    private productService: ProductService
  ) {
    this.cart$ = this.checkoutService.cart$;
    this.total$ = this.checkoutService.total$;
  }

  ngOnInit(): void {}

  addItem(productId: string): void {
    this.checkoutService.scanItem(productId);
  }

  removeItem(productId: string): void {
    this.checkoutService.removeItem(productId);
  }

  getItemPrice(productId: string, quantity: number): number {
    return this.productService.calculatePrice(productId, quantity);
  }

  getRegularPrice(productId: string, quantity: number): number {
    const product = this.productService.getProductById(productId);
    return product ? product.price * quantity : 0;
  }

  getSavings(productId: string, quantity: number): number {
    const regularPrice = this.getRegularPrice(productId, quantity);
    const actualPrice = this.getItemPrice(productId, quantity);
    const savings = regularPrice - actualPrice;
    return savings > 0 ? savings : 0;
  }

  clearCart(): void {
    this.checkoutService.clearCart();
  }
}
