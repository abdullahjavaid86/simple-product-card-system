export interface Product {
  readonly id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

export type Products = Product[];
