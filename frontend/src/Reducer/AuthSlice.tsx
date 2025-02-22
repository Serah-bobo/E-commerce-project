// Import `createSlice` to easily create Redux reducers and actions
// Import `PayloadAction` to define the type of action payloads
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the authentication state interface
interface AuthState {
    token: string | null; // The token is either a string (if logged in) or null (if not logged in)
}

// Define the initial state for authentication
const initialState: AuthState = {
    token: localStorage.getItem('token') || null, // Retrieve token from local storage to persist login after refresh
};

// Create a Redux slice (a modular piece of state management)
const AuthSlice = createSlice({
    name: 'auth', // The name of this slice in the Redux store
    initialState, // Set the initial state

    // Define the reducers (functions that modify state)
    reducers: {
        // Reducer to handle login action
        login(state, action: PayloadAction<{ token: string }>) {
            state.token = action.payload.token; // Set the token from the action payload
        },
        // Reducer to handle logout action
        logout: (state) => {
            state.token = null; // Remove the token from state
            localStorage.removeItem('token'); // Remove token from local storage when logging out
        }
    }
});

// Export actions to be used in React components
export const { login, logout } = AuthSlice.actions;

// Export the reducer to be added to the Redux store
export default AuthSlice.reducer;
