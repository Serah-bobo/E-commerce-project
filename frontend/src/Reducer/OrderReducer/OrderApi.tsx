import { Order,OrderUpdate } from "./Types"

const API_URL="http://localhost:5000/api/"
//create order
//partial is a ts type that makes properties optional meaning the orderData properties not all are required
export const createOrder=async (orderData:Partial<Order>)=>{
    try{
        const token = localStorage.getItem("token"); // Get token from storage
       if (!token) throw new Error("User is not authenticated");
        const response=await fetch (`${API_URL}/user/order`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify(orderData)
        });
        const data=await response.json();
        if(!response.ok){
            throw new Error("Failed to create order")
        }
        return data;
    }catch(error){
        throw error
    }
}
//fetch all orders(admins only)

export const fetchOrders=async()=>{
    try{
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) throw new Error("User is not authenticated");
        if(localStorage.getItem("role")!=="admin") throw new Error("User does not have permission to view orders")
        const response=await fetch (`${API_URL}/admin/order`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        const data=await response.json();
        if(!response.ok){
            throw new Error("Failed to fetch orders")
        }
        return data;
    }catch(error){
        throw error
    }
}

//fetch user order

export const fetchUserOrder=async()=>{
    try{
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) throw new Error("User is not authenticated");
        const response=await fetch (`${API_URL}/user/order`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        const data:[Order]=await response.json();
        if(!response.ok){
            throw new Error("Failed to fetch order")
        }
        return data;
    }catch(error){
        throw error
    }
}

//update order status

export const updateOrderStatus=async({id,status}:OrderUpdate):Promise<OrderUpdate>=>{
    try{
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) throw new Error("User is not authenticated");
        if(localStorage.getItem("role")!=="admin") throw new Error("User does not have permission to delete orders")
        const response=await fetch (`${API_URL}/admin/order/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({status})
        });
        const data=await response.json();
        if(!response.ok){
            throw new Error("Failed to update order status")
        }
        return data;
    }catch(error){
        throw error
    }
}
//delete order 

export const deleteOrder=async(id:string)=>{
    try{
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) throw new Error("User is not authenticated");
        const response=await fetch (`${API_URL}/order/${id}`,{
            method:"DELETE",
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.ok){
            throw new Error("Failed to delete order")
        }
    }catch(error){
        throw error
    }
}