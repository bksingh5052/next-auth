// VerifyEmail.js
'use client'
import React, { useState, Suspense } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const router = useRouter();
  const params = useSearchParams();
  const urlToken = params.get('token');
  const [token, setToken] = useState(urlToken);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/api/users/verifyemail', { token });
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      toast.success(res.data.message);
      router.push('/login');
    } catch (error:any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <button
        onClick={verifyUserEmail}
        disabled={loading}
        className='bg-blue-500 text-white py-2 px-3 rounded-md disabled:opacity-50'
      >
        {loading ? 'Verifying...' : 'Verify Email'}
      </button>
    </div>
  );
};

const VerifyEmailWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailWithSuspense;
