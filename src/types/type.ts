export interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  colour: string;
}

export interface CartItem extends Product {
  quantity: number;
}
