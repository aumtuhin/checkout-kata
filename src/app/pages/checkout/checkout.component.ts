import { Component } from '@angular/core';

import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-checkout',
  imports: [ProductListComponent, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {}
