export interface Criteria {
  limit: number;
  skip: number;
}

export interface Response<MODEL> {
  total: number;
  skip: number;
  limit: number;
  products: Array<MODEL>;
}

export interface Model {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}
