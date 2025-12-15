export interface BuyNowProduct {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  quantity: number;
}

export interface Order extends BuyNowProduct {
  orderDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Completed';
}