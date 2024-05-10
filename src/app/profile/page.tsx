'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


export default function Profile()  {
  const [data, setData] = useState('')
  const router = useRouter()


  const getUserData = async ()=>{
    try {
      const res = await axios.get('/api/users/me')
      if(res.data.error){
        throw new Error(res.data.error)
      }
      console.log(res.data.user._id)
      setData(res.data.user._id)
    } catch (error:any) {
      console.log(error.message)
    }
  }

  const logout = async()=>{
    try {
      await axios.get('/api/users/logout')
      toast.success("Logged out")
      router.push("/login")
    } catch (error) {
      
    }
  }
  return (
    <div className='flex h-screen justify-center items-center flex-col'>
      <h1>Profile page</h1>
      <h1>{data === ''? "No Data" : (<Link href={`/profile/${data}`}>{data}</Link>)}</h1>
     <button onClick={getUserData} className='bg-blue-500 py-2 px-3 rounded-md mt-2'>Get user details</button>
     <button onClick={logout}  className='bg-red-500 py-2 px-3 rounded-md mt-2' >Loguot</button>
    </div>
  )
}

  
