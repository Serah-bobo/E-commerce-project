// Import `configureStore` from Redux Toolkit to create and configure the Redux store.
import { configureStore } from "@reduxjs/toolkit";

// Import the authentication reducer from the `AuthSlice` file.
// This reducer will manage the authentication state of the application.
import authReducer from "./AuthSlice";

// Create and configure the Redux store.
export const store = configureStore({
    reducer: {
        // The `auth` slice manages authentication-related state (e.g., login, logout, token storage).
        auth: authReducer, 
    },
});

// Define `RootState` type using TypeScript.
// This represents the entire Redux state structure, allowing TypeScript to infer state types.
export type RootState = ReturnType<typeof store.getState>;

// Define `AppDispatch` type using TypeScript.
// This ensures correct type inference for `dispatch` when using Redux actions in the app.
export type AppDispatch = typeof store.dispatch;
