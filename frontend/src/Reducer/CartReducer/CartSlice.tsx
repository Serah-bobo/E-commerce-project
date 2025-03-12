import { createSlice,PayloadAction } from "@reduxjs/toolkit";
interface  CartItem{
    id: string;
    name: string;
    price: number;
    quantity: number;
    
}

interface CartState {
    items: CartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
}



const CartSlice =createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state,action:PayloadAction<CartItem>)=>{
            const existingItem=state.items.find((item)=>item.id===action.payload.id);
            if(!existingItem){
                state.items.push(action.payload)
                alert("item added successfully!")
            }else{
                alert("item already exists")
            }
        }
    }
})

export const {addToCart}=CartSlice.actions;

export default CartSlice.reducer;
