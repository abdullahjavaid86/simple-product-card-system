export interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
}

export type CartActionTypes = "add" | "remove" | "increment" | "decrement";

export type CartItems = CartItem[];
