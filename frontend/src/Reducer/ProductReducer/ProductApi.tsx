const API_URL="http://localhost:5000/api/products"
export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image:string;
  }

  //fetch all products
  export const FetchAllProducts=async(
    id:String,
    page: number,
  limit: number,
  sort: string,
  filter: string
  )=>{
    
    try{
      const response = await fetch
      (
        `${API_URL}?page=${page}&limit=${limit}&sort=latest&filter=all`
      );
      const data=await response.json()
      if(!response.ok){
        throw new Error("Failed to fetch products")
      }
      return data;
    }catch(error){
      throw error
    }
  }

  export const CreateProducts=async(productData:FormData,token:string)=>{
    try{
      const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body:productData
      });
      const data=await response.json()
      if(!response.ok){
        throw new Error("Failed to create product")
      }
      return data;
    }catch(error){
      throw error
    }
  }