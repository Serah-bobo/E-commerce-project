import { useState, useEffect } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";

interface User {
    name: string;
    email: string;
    profileImage?: string;
}

const Profile = () => {
    const [user, setUser] = useState<User>({ name: "", email: "", profileImage: "" });
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.name && parsedUser.email) {
                    setUser(parsedUser);
                    setPreviewImage(parsedUser.profileImage || "");
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
                setUser((prevUser) => ({ ...prevUser, profileImage: reader.result as string }));

                localStorage.setItem("user", JSON.stringify({ ...user, profileImage: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="max-w-md p-6 mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl">
            <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800">Profile</h2>

            {/* Profile Image Section */}
            <div className="relative flex flex-col items-center">
                <div className="relative border-4 border-gray-300 rounded-full shadow-md group w-28 h-28">
                    {previewImage ? (
                        <img src={previewImage} alt="Profile" className="object-cover w-full h-full rounded-full" />
                    ) : (
                        <FaUserCircle className="w-full h-full text-gray-400" />
                    )}

                    {/* Edit Icon (Visible on Hover) */}
                    <label
                        htmlFor="imageUpload"
                        className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100"
                    >
                        <FaCamera className="w-6 h-6 text-white" />
                    </label>
                    <input type="file" id="imageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>

                {/* Name & Email */}
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{user.name || "User Name"}</h3>
                    <p className="text-sm text-gray-600">{user.email || "user@example.com"}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
