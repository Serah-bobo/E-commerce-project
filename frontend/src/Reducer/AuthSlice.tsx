import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the authentication state interface
interface AuthState {
    token: string | null;
    role: "user" | "admin" | null; // Store the user role
}

// Define the initial state for authentication
const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    role: (localStorage.getItem("role") as "user" | "admin") || null, // Retrieve role from localStorage
};

// Create a Redux slice (a modular piece of state management)
const AuthSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        // Reducer to handle login action
        login(
            state,
            action: PayloadAction<{ token: string; role: "user" | "admin" }>
        ) {
            state.token = action.payload.token;
            state.role = action.payload.role;

            localStorage.setItem("token", action.payload.token); // Store token
            localStorage.setItem("role", action.payload.role); // Store user role
            localStorage.setItem("loggedin", "true");

        },

        // Reducer to handle logout action
        logout: (state) => {
            state.token = null;
            state.role = null;

            localStorage.removeItem("token"); // Remove token from local storage
            localStorage.removeItem("role"); // Remove role from local storage
            localStorage.removeItem("loggedin");

        },
    },
});

// Export actions to be used in React components
export const { login, logout } = AuthSlice.actions;

// Export the reducer to be added to the Redux store
export default AuthSlice.reducer;
