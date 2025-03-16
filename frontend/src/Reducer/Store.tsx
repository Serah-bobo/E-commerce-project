// Import `configureStore` from Redux Toolkit to create and configure the Redux store.
import { configureStore } from "@reduxjs/toolkit";
//queryClient is an instance that manages and caches api requests,fetch,cache,update and synchronize data.
import { QueryClient } from "@tanstack/react-query";
// Import the authentication reducer from the `AuthSlice` file.
// This reducer will manage the authentication state of the application.
import authReducer from "./AuthSlice";
import productReducer from './ProductReducer/ProductSlice'
import cartReducer from './CartReducer/CartSlice'

//create an instance
export const queryClient = new QueryClient();
// Create and configure the Redux store.
export const store = configureStore({
    reducer: {
        // The `auth` slice manages authentication-related state (e.g., login, logout, token storage).
        auth: authReducer, 
        product: productReducer,  // The `product` slice manages product-related state (e.g., fetching products, adding products)  // Add other slices as needed.  // Add other slices as needed.  // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed
        cart: cartReducer, // The `cart` slice manages the shopping cart state (e.g., adding items, removing items, updating quantities)  // Add other slices as needed.  // Add other slices as needed.  // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices as needed.   // Add other slices
    },


});

// Define `RootState` type using TypeScript.
// This represents the entire Redux state structure, allowing TypeScript to infer state types.
export type RootState = ReturnType<typeof store.getState>;

// Define `AppDispatch` type using TypeScript.
// This ensures correct type inference for `dispatch` when using Redux actions in the app.
export type AppDispatch = typeof store.dispatch;
