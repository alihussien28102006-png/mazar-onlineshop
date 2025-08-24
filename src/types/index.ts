export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors?: string[];
  colorImages?: { [color: string]: string };
}

export interface CartItem {
  product: Product;
  size: string;
  color?: string;
  quantity: number;
}