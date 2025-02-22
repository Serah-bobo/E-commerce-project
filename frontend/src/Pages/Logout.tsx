import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOutUser } from "Reducer/Api";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            const success = await LogOutUser();
            if (success) {
                navigate("/login"); // Redirect to login page
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-700">Logging Out...</h1>
            <p className="text-gray-500">Redirecting to login...</p>
        </div>
    );
};

export default Logout;
