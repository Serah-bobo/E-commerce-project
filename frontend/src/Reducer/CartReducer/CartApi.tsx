const API_URL="http://localhost:5000/api"

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }

  export interface Cart {
    _id: string;
    owner: string;
    items: CartItem[];
    totalPrice: number;
  }

  export const addCart=async(itemID: string, quantity: number, token: string)=>{
    try{
      const response = await fetch
      (
        `${API_URL}/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({itemID, quantity})
        }
      );
      const data=await response.json()
      if(!response.ok){
        throw new Error("Failed to add item to cart")
      }
      return data
    }catch(error){
      console.error(error)
    }
  }