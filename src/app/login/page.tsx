"use client";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Login()  {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSignup = async (e:any) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res)
      if(res.data.error){
        throw new Error(res.data.error)
      }
      toast.success(res.data.message);
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
      console.log("Failed to signup");
    }
  };
  const formHandler =(e:any)=>{
    const name = e.target.name;
    const value = e.target.value
    setUser({...user, [name]:value })
    console.log(user)
  }
  useEffect(() => {
    if (

      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center w-full h-screen text-white flex-col">
      <h1 className="text-2xl">{loading ? "Processing..." : "Login"}</h1>
      <form className="flex flex-col gap-4" onSubmit={onSignup}>
  
        <input
          className="rounded-md px-3 py-2 mt-1 w-[300px] text-black"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={formHandler}
          placeholder="Email"
        />
        <input
          className="rounded-md px-3 py-2 mt-1 w-[300px] text-black"
          type="text"
          name="password"
          id="password"
          value={user.password}
          onChange={formHandler}
          placeholder="Password"
        />
        <button
          disabled={buttonDisabled}
          className="rounded-md px-3 py-2 bg-blue-600 disabled:bg-blue-400"
        >
          Login
        </button>
        <Link className="text-center text-blue-200" href='/signup'>Does not have an account? Signup</Link>
      </form>
    </div>
  );
}

  
