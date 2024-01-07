export interface Stock {
  commodity: string;
  stock: number;
  unit: string;
  unit_value: number;
  expiry?: string;
  _id?: string;
}
export interface OrderItem {
  commodity: string;
  unit: string;
  quantity: number;
  _id?: string;
}
export interface Order {
  title: string;
  created_date?: Date | string | number;
  updated_date?: Date | string | number;
  items: OrderItem[];
  _id?: string;
}
