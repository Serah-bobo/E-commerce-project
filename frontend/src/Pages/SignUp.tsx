import { useForm, SubmitHandler } from 'react-hook-form';
import { registerUser } from 'Reducer/Api';
import { useNavigation, redirect, useActionData } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaLock, FaUser } from 'react-icons/fa';
import { useState } from 'react';

interface SignInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function Action({ request }: { request: Request }) {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/login";
  
    try {
      await registerUser(name, email, password);
      localStorage.setItem("loggedin", "true");
      return redirect(pathname);
    } catch (err: any) {
      return err.message;
    }
}
  
const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SignInput>();
    const [showPassword, setShowPassword] = useState(false);
    const errorMessage = useActionData() as string;
    const navigation = useNavigation();

    // Handle form submission
    const onSubmit: SubmitHandler<SignInput> = async (data) => {
        try {
          await registerUser(data.name, data.email, data.password);
          localStorage.setItem("loggedin", "true");
          reset(); // Reset the form after successful submission
          window.location.href = "/login";
        } catch (err: any) {
          console.error("Signup error:", err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
           <div className="p-8 bg-white rounded-lg shadow-lg w-96">
               <h1 className="mb-4 text-2xl font-semibold text-center">Create a new account</h1>

               {/* Display error messages */}
               {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}  
               <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                  {/* Name */}
                  <div className="mb-6">
                      <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                      <div className="relative">
                          <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">
                              <FaUser />
                          </span>
                          <input
                              type="text"
                              id="username"
                              {...register('name', {
                                  required: 'Name is required',
                                  minLength: { value: 3, message: 'Must be at least 3 characters' },
                                  maxLength: { value: 20, message: 'Cannot exceed 20 characters' }
                              })}
                              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  
                  {/* Email */}
                  <div className="mb-6">
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                      <input
                          type="email"
                          id="email"
                          {...register('email', {
                              required: 'Email is required',
                              pattern: {
                                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                  message: 'Invalid email format'
                              }
                          })}
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
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
                                  required: 'Password is required',
                                  minLength: { value: 5, message: 'Must be at least 5 characters' },
                                  maxLength: { value: 12, message: 'Cannot exceed 12 characters' }
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
                      {navigation.state === "submitting" ? "Signing up..." : "Sign Up"}
                  </button>
              </form> 
           </div>
        </div>
    );
}

export default SignUp;
