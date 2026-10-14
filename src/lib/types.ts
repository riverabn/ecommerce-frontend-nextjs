export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number | string;
  stock: number;
  image_url: string | null;
};

export type OrderItem = {
  id?: number;
  product_id: number;
  quantity: number;
};

export type Order = {
  id: number;
  status: string;
  total: number | string;
  created_at?: string;
  items?: OrderItem[];
  order_items?: OrderItem[];
};

export type FormState =
  | { error?: string; fieldErrors?: Record<string, string[]> }
  | undefined;