import { createSlice,PayloadAction} from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image:string,
  category:string
}

interface CartState {
  items: CartItem[];

}

const initialState: CartState = {
  items: []
};

const CartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
      addToCart: (state, action) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        
        if (existingItem) {
          existingItem.quantity += 1; // ✅ Always increment by 1
        } else {
          state.items.push({ ...action.payload, quantity: 1}); // ✅ Ensure quantity is set
        }
      },
      removeCart: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      },
      clearCart:(state)=>{
        state.items=[];
      },
      updateCartQuantity: (state, action: PayloadAction<{ id: string; amount: number }>) => {
        const item = state.items.find((item) => item.id === action.payload.id);
        if (!item) return;
          
        
        item.quantity += action.payload.amount;
        //
        if(item.quantity <= 0){
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
      
      },
    },
  });
  

export const { addToCart, removeCart, clearCart,updateCartQuantity } = CartSlice.actions;

export default CartSlice.reducer;
