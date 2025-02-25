const API_URL="http://localhost:5000/api/products"
export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    owner: string;
    createdAt: string;
    updatedAt: string;
  }

  //fetch all products
  export const FetchAllProducts=