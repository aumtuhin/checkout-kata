import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Product, Offer } from '../../models/product.model';
import { FormatCurrencyPipe } from "../../pipes/format-currency.pipe";
import { ProductService } from '../../services/product.service';
import { CheckoutService } from '../../services/checkout.service';

import { ButtonComponent } from '../ui/button/button.component';
import { BadgeComponent } from '../ui/badge/badge.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BadgeComponent, FormatCurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  offers: Map<string, Offer> = new Map();

  constructor(
    private productService: ProductService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    this.productService.getOffers().forEach((offer) => {
      this.offers.set(offer.productId, offer);
    });
  }

  getOffer(productId: string): Offer | undefined {
    return this.offers.get(productId);
  }

  addToCart(productId: string): void {
    this.checkoutService.scanItem(productId);
  }
}
