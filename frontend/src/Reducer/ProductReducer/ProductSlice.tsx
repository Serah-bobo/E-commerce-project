import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface product{
    id: string;
    name: string;
    price: number;
    image: string;
    category:string;
    description:string;
}

interface ProductState {
    products: product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name:"product",
    initialState,

    reducers: {
        //fetch all products
        getAllProducts(state,action:PayloadAction<product[]>){
            state.products = action.payload;
        },
        //add new product
        addProduct(state,action: PayloadAction<product>){
            state.products.push(action.payload);
        },
       
    }
})

export const { getAllProducts, addProduct } = productSlice.actions;

export default productSlice.reducer;