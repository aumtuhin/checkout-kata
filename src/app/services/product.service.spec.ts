import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { MOCK_PRODUCTS, MOCK_OFFERS } from '../data/mock-data';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should return all products', () => {
    const products = service.getProducts();
    expect(products.length).toBe(MOCK_PRODUCTS.length);
    expect(products).not.toBe(MOCK_PRODUCTS); // should return a copy
  });

  it('should return all offers', () => {
    const offers = service.getOffers();
    expect(offers.length).toBe(MOCK_OFFERS.length);
    expect(offers).not.toBe(MOCK_OFFERS);
  });

  it('should return a product by ID', () => {
    const product = service.getProductById('1');
    expect(product).toEqual(MOCK_PRODUCTS.find((p) => p.id === '1'));
  });

  it('should return undefined for non-existing product', () => {
    const product = service.getProductById('999');
    expect(product).toBeUndefined();
  });

  it('should return offer for a product', () => {
    const offer = service.getOfferForProduct('1');
    expect(offer).toEqual(MOCK_OFFERS.find((o) => o.productId === '1'));
  });

  it('should return undefined when no offer exists for product', () => {
    const offer = service.getOfferForProduct('999');
    expect(offer).toBeUndefined();
  });

  describe('calculatePrice', () => {
    it('should return 0 for invalid product', () => {
      expect(service.calculatePrice('999', 5)).toBe(0);
    });

    it('should calculate regular price when no offer exists', () => {
      const product = MOCK_PRODUCTS[0];
      spyOn(service, 'getOfferForProduct').and.returnValue(undefined);

      const total = service.calculatePrice(product.id, 3);
      expect(total).toBe(product.price * 3);
    });

    it('should calculate price with offer applied', () => {
      const product = MOCK_PRODUCTS[0];
      const offer = MOCK_OFFERS.find((o) => o.productId === product.id)!;

      // Example: Buy 3 for €10, price = 4.5
      const total = service.calculatePrice(product.id, 7);

      const offerSets = Math.floor(7 / offer.quantity); // 7/3 = 2
      const remainder = 7 % offer.quantity; // 1
      const expected = offerSets * offer.offerPrice + remainder * product.price;

      expect(total).toBe(expected);
    });
  });
});
