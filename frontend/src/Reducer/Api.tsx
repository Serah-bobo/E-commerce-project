const API_URL="http://localhost:5000/api/auth"

// Define user type based on schema
interface User {
    name: string;
    email: string;
    password?: string; // Optional for fetching user details
    role?: "user" | "admin";
  }
  
  // Define login response type
  interface AuthResponse {
    token: string;
    user: User;
  }
export const registerUser=async(name:string,email:string,password:string):Promise<AuthResponse>=>{
    try {
      const response=await fetch(`${API_URL}/signup`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name,password,email})
      })
      const data=await response.json();
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      
      localStorage.setItem("token",data.token);//store token in localstorage
      localStorage.setItem("role", data.user.role); // Save role
      localStorage.setItem("loggedin", "true");

      return data
    } catch (error) {
      throw error;
    }
  
}
//login api
export const LoginUser=async(email:string,password:string):Promise<AuthResponse>=>{
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error("Failed to login");
        }

        localStorage.setItem("token", data.token); // store token in localstorage
        localStorage.setItem("role", data.user.role); // Save role
        localStorage.setItem("loggedin", "true");

        return data;
    } catch (error) {
        throw error;
    }
}
//logout user
export const LogOutUser = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        localStorage.removeItem("token"); // Clear token on successful logout
        localStorage.removeItem("role");
        localStorage.removeItem("loggedin");

        return true;
    } catch (error) {
        console.error("Error logging out:", error);
        return false;
    }
};