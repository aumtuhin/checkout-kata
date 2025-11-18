import { TestBed } from '@angular/core/testing';
import { CheckoutService } from './checkout.service';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 5
  };

  beforeEach(() => {
    let store: Record<string, string> = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (store[key] = value)
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => delete store[key]);

    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
      'calculatePrice'
    ]);

    productServiceSpy.getProductById.and.returnValue(mockProduct);
    productServiceSpy.calculatePrice.and.callFake(() => 5);

    TestBed.configureTestingModule({
      providers: [CheckoutService, { provide: ProductService, useValue: productServiceSpy }]
    });

    service = TestBed.inject(CheckoutService);
  });

  it('should load empty cart on init when no storage exists', () => {
    service.cart$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should scan an item and add to cart', () => {
    service.scanItem('1');

    service.cart$.subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(1);
      expect(items[0].product.id).toBe('1');
    });
  });

  it('should increase quantity when scanning same item twice', () => {
    service.scanItem('1');
    service.scanItem('1');

    service.cart$.subscribe((items) => {
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should remove an item (reduce quantity)', () => {
    service.scanItem('1');
    service.scanItem('1');
    service.removeItem('1');

    service.cart$.subscribe((items) => {
      expect(items[0].quantity).toBe(1);
    });
  });

  it('should delete item if quantity becomes zero', () => {
    service.scanItem('1');
    service.removeItem('1');

    service.cart$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should clear cart', () => {
    service.scanItem('1');
    service.clearCart();

    service.cart$.subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should save cart to localStorage', () => {
    service.scanItem('1');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
