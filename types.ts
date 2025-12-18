export interface Product {
  id: string;
  name: string;
  team: string;
  priceCZK: number;
  priceEUR: number;
  image: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
}

export enum ViewState {
  HOME = 'HOME',
  ALL_PRODUCTS = 'ALL_PRODUCTS',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CHECKOUT = 'CHECKOUT',
  SUCCESS = 'SUCCESS',
  SHIPPING_INFO = 'SHIPPING_INFO',
  RETURNS_INFO = 'RETURNS_INFO',
  SIZE_CHART = 'SIZE_CHART',
  CAREER = 'CAREER',
  NEWS = 'NEWS',
  SUSTAINABILITY = 'SUSTAINABILITY',
  REGISTER = 'REGISTER'
}