export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  categoryId: string;
  imageUrl?: string;
}