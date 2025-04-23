/*useMutation is used to handle non-fetching requests like POST,GET,PATCH/PUT,
runs when manually triggered,modifies data 
returns state like onSuccess,error or loading,
there is mutate,asyncMutate(function),isLoading,isError,isSuccess,error(details),data(fetched data)
*/
//useQuery is used for fetching and caching data,runs automatically,cached automatically
//useQueryClient gives you access to queryClient to manage cached data and trigger refetching,invalidate queries
import { useQuery,useMutation,useQueryClient ,UseQueryResult} from "@tanstack/react-query";
import { createOrder,fetchOrders,fetchUserOrder,updateOrderStatus,deleteOrder } from "./OrderApi";
import { Order } from "./Types";

//create Order
export const useCreateOrder=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:createOrder,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["createOrders"] });
        },
        onError:(error)=>{
            console.error('Error creating order:',error);
        },
        
    })
}

//fetch all orders

export const useFetchOrders=()=>{
    return useQuery<Order[]>({
        queryKey:["allOrders"],
        queryFn:fetchOrders,
       // staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
        // retry: 3, // Retry failed requests up to 3 times

    })
}

//fetch user orders



export const useFetchUserOrders = (): UseQueryResult<Order[]> => {
  return useQuery<Order[]>({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrder,
  });
};
//update order

export const useUpdateOrderStatus=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:updateOrderStatus,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["allOrders"] }); // Refetch all orders
        }
    })
}

//delete order

export const useDeleteOrder=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:deleteOrder,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["allOrders"] }); // Refetch all orders
            queryClient.invalidateQueries({ queryKey: ["userOrders"] }); // Refetch user orders
        }
    })
}