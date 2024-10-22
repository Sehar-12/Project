import React from 'react';
import loginimg from '../../public/Loginimage.png';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider'; // Import useAuth

function Login() {
  const { register, handleSubmit } = useForm();
  const [authUser, setAuthUser] = useAuth(); // Use setAuthUser to update the context
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    };
    
    await axios.post("http://localhost:4001/user/login", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Login successful");
          // Store user in localStorage
          localStorage.setItem("Users", JSON.stringify(res.data.user));
          // Update authUser in context
          setAuthUser(res.data.user); // This updates the AuthProvider context
          // Navigate to home page
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  
  return (<>
    <div className="mx-4 sm:mx-20 md: mx-40 my-7 lg:mx-70 xl:mx-80 my-20 border-2 w-full max-w-[700px] h-[500px] rounded shadow-lg flex flex-col md:flex-row">
      {/* Form Section */}
      <div className="flex-1 p-7">
        <h1 className="text-2xl md:text-4xl font-semibold text-black mb-4 md:mb-6">
          Log<span className="text-pink-500">In</span>
        </h1>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your email"
            required
          />
          
          <label htmlFor="password" className="font-bold">
            Password:
            <span className="font-light font-size-7 ml-7">
              <Link to="/" className="text-blue-500 hover:underline">Forgot password?</Link>
            </span>
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter password"
            required
          />
         
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-800 mr-16 ml-16 mt-4 text-white px-4 py-2 rounded transition"
          >
            LOG IN
          </button>

          <p className='mt-4'>
            Don't have an account? 
            <span className='ml-1 text-blue-500'>
              <Link to='/Signup' className='hover:underline'>Sign Up</Link>
            </span>
          </p>
        </form>
      </div>

      {/* Image Section */}
      <div className="flex-1 p-4 hidden md:block">
        <img
          src={loginimg}
          alt="Illustration of books for login"
          className="w-full h-full object-cover rounded-r"
        />
      </div>
    </div>
    </>
  );
}

export default Login;
