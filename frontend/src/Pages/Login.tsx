import { LoginUser } from "Reducer/Api";
import { useNavigation, redirect, useActionData,Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginInput {
  email: string;
  password: string;
}

export async function Action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/";

  try {
    await LoginUser(email, password);
    localStorage.setItem("loggedin", "true");
    return redirect(pathname);
  } catch (err: any) {
    return err.message;
  }
}

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginInput>();
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = useActionData() as string;
  const navigation = useNavigation();

  // Handle form submission
  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await LoginUser(data.email, data.password);
      localStorage.setItem("loggedin", "true");
      reset();
      window.location.href = "/";
    } catch (err: any) {
      console.error("Login error:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h1 className="mb-4 text-2xl font-semibold text-center">Login to your account</h1>
     {/* Display error messages */}
     {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>} 
     {/* Display error messages */}
     {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}  

<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
  {/* Email */}
  <div className="mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
    <div className="relative">
      <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
        <FaEnvelope />
      </span>
      <input
        type="email"
        id="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
            message: "Invalid email format"
          }
        })}
        className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
  </div>

  {/* Password */}
  <div className="mb-4">
    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">Password</label>
    <div className="relative">
      <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
        <FaLock />
      </span>
      <input
        {...register("password", {
          required: "Password is required",
          minLength: { value: 5, message: "Must be at least 5 characters" },
          maxLength: { value: 12, message: "Cannot exceed 12 characters" }
        })}
        className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute transform -translate-y-1/2 right-3 top-1/2"
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
    disabled={navigation.state === "submitting"}
  >
    {navigation.state === "submitting" ? "Logging in..." : "Login"}
  </button>
             {/* Forgot Password & Sign Up Links */}
             <div className="flex justify-between mt-4 text-sm">
                        <button type="button" className="text-blue-500 hover:underline">Forgot Password?</button>
                        <Link to="/signup" className="text-blue-500 cursor-pointer hover:underline">Sign Up</Link>
                    </div>
</form> 
      </div>
    </div>
  )
}

export default Login


