'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';



export default function VerifyEmail() {
  const router = useRouter()
  const params = useSearchParams()
  const urlToken = params.get('token')
  const [token,setToken] = useState(urlToken);
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(token)


  const verifyUserEmail = async ()=>{
    setLoading(true)
    try {
      const res = await axios.post('/api/users/verifyemail',{token})
      console.log(res)
      if(res.data.error){
        throw new Error(res.data.error)
      }
      toast.success(res.data.message)
      router.push('/login')

    } catch (error:any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  
  return (
    <div className='flex items-center justify-center h-screen'>
      <button onClick={verifyUserEmail} disabled={loading} className='bg-blue-500 text-whiterounded py-2 px-3 rounded-md disabled:opacity-50'>{loading ? 'Verifying...' : 'Verify Email'}</button>
    </div>
  )
}

  
