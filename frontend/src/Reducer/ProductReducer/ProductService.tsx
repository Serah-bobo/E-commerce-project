import { useQuery,useQueryClient,useMutation,UseQueryResult } from "@tanstack/react-query";
import { FetchAllProducts,CreateProducts,GetProductById } from "./ProductApi";

//creating a product for admins only
export const useCreateProduct=()=>{
    const queryClient=useQueryClient;
    return useMutation({
        mutationFn: CreateProducts,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["create products"]})
        },
        onError:(error)=>{
            console.log("error  creating product",error)
        }
    })
}

//fetching products
export const useFetchProducts=()=>{
    return useQuery:({
        queryKey:"products",
        queryFn:FetchAllProducts
    })
}

//fetch products by id
export const useFetchProductsById=()=>{
    return useQuery:({
        queryKey:"productsById",
        queryFn:GetProductById
    })
}