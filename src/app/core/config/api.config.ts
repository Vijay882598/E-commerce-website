import { environment } from "../../../environments/environment"
export const API_LIST = [
  {
    name: 'GET_CATEGORIES',
    url: `${environment.apiBaseUrl}/products/categories`,
    method: 'GET',
    status: true
  },
  {
    name: 'GET_PRODUCTS_BY_CATEGORY',
    url: `${environment.apiBaseUrl}/products/category`,
    method: 'GET',
    status: true
  },
  {
    name: 'GET_PRODUCTS',
    url: `${environment.apiBaseUrl}/products`,
    method: 'GET',
    status: true
  },
  {
    name: 'CREATE_USER',
    url: `${environment.apiBaseUrl}/users/add`,
    method: 'POST',
    status: true
  },
  {
    name: 'ADD_TO_CART',
    url: `${environment.apiBaseUrl}/carts/add`,
    method: 'POST',
    status: true
  },
  {
    name: 'GET_SINGLE_PRODUCT_DETAIL',
    url: `${environment.apiBaseUrl}/products`,
    method: 'GET',
    status: true
  },
  {
    name: 'GET_CARTS_LIST',
    url: `${environment.apiBaseUrl}/carts/user`,
    method: 'GET',
    status: true
  }
];
