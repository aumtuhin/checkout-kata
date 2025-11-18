import { Product, Offer } from '../models/product.model';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'apple',
    name: 'Apple',
    price: 30,
    imageUrl: '🍎',
  },
  {
    id: 'banana',
    name: 'Banana',
    price: 50,
    imageUrl: '🍌',
  },
  {
    id: 'peach',
    name: 'Peach',
    price: 60,
    imageUrl: '🍑',
  },
  {
    id: 'kiwi',
    name: 'Kiwi',
    price: 20,
    imageUrl: '🥝',
  },
];

export const MOCK_OFFERS: Offer[] = [
  {
    productId: 'apple',
    quantity: 2,
    offerPrice: 45,
    description: '2 for 45',
  },
  {
    productId: 'banana',
    quantity: 3,
    offerPrice: 130,
    description: '3 for 130',
  },
];
