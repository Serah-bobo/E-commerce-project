import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: ProtectedRouteProps) => {
    const isAdmin = localStorage.getItem("role") === "admin";
  
    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-2xl font-bold text-red-500">Unauthorized Access</h1>
            </div>
          );
    }
  
    return <>{children}</>;
  };
  
  export default AdminRoute;