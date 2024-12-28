import React from 'react';
import loginimg from '../../public/Loginimage.png';
import { useForm } from "react-hook-form";
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const location=useLocation();
  const navigate=useNavigate();
  const from=location.state?.from?.pathname||"/"
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) =>{ 
   const userInfo={
    fullname:data.fullname,
    email:data.email,
    password:data.password
   }
  await axios.post("https://project-1l2d.onrender.com/user/signup",userInfo)
   .then((res)=>{
    console.log(res);
    if(res.data)
    {
      toast.success("Signup succesfull");
      setAuthUser(res.data.user);
      navigate(from,{replace:true});
    }
    localStorage.setItem("Users",JSON.stringify(res.data.user));
   }).catch((err)=>{
   if(err.response)
   {
    console.log(err);
    toast.error("Error: "+err.response.data.message);
   }
   })
  };
  return (
    <div className="mx-2 sm:mx-10 md:mx-30 my-5 lg:mx-40 xl:mx-80 my-20 border-2 w-full max-w-[700px] h-[540px] rounded shadow-lg flex flex-col md:flex-row">
      {/* Form Section */} {/* Image Section */}
      <div className="flex-1 p-7 hidden md:block">
        <img
          src={loginimg}
          alt="Illustration of books for login"
          className="ml-5 w-full h-full object-cover rounded-r"
        />
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl md:text-4xl font-semibold text-black mb-4 md:mb-6">
            Sign<span className="text-pink-500">Up</span>
        </h1>
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          
        <label htmlFor="fullname" className="font-bold">
            Username:
          </label>
          <input
          {...register("fullname")} 
            id="fullname"
            type="text"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your Name"
            required
          />
          <label htmlFor="email" className="font-bold">
            Email:
          </label>
          <input
          {...register("email")} 
            id="email"
            type="email"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter your email"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}"
            required
          />

          
          <label htmlFor="password" className="font-bold">
            Password:
          </label>
          <input
          {...register("password")} 
            id="password"
            type="password"
            className="border border-gray-300 rounded px-4 py-2"
            placeholder="Enter password"
            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
            title="Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)." 
            required
          />
         
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-800 mr-16 ml-16 mt-4 text-white px-4 py-2 rounded transition"
          >
            SIGN UP
          </button>
          <p className='mt-4'>Already have a Account?<span className='ml-1 text-blue-500'><a href='/Login' className='hover:underline onClick:text-blue-900'>LogIn</a></span></p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

