export interface Order {
    _id?: string;
    owner: string;
    name: string;
    products: string[];
    phone: string;
    address: string;
    status?: string;
  }
  
  export interface OrderUpdate {
    id: string;
    status: string;
  }
  
  export interface OrderState {
    userOrders: Order[];
    allOrders: Order[];
    loading: boolean;
    error: string | null;
  }
  