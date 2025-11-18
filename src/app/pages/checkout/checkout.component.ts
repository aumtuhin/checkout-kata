import { Component } from '@angular/core';

import { ButtonComponent } from '../../components/ui/button/button.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-checkout',
  imports: [ButtonComponent, ProductListComponent, CartComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {}
