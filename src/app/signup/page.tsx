"use client";
import React, { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onSignup = async (e:any) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log(res)
      if(res.data.error){
        throw new Error(res.data.error)
      }
      toast.success(res.data.message);
      setLoading(false);
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
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex items-center justify-center w-full h-screen text-white flex-col">
      <h1 className="text-2xl">{loading ? "Processing..." : "Signup"}</h1>
      <form className="flex flex-col gap-4" onSubmit={onSignup}>
        <input
          className="rounded-md px-3 py-2 mt-4 w-[300px] text-black"
          type="email"
          name="email"
          id="email"
          onChange={formHandler}
          value={user.email}
          placeholder="Email"
        />
        <input
          className="rounded-md px-3 py-2 mt-1 w-[300px] text-black"
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={formHandler}
          placeholder="Username"
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
          Signup
        </button>
        <Link className="text-center text-blue-200" href='/login'>Already have an account? Login</Link>
      </form>
    </div>
  );
}
