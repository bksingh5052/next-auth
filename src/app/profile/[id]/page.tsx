import React from 'react'

function page({params}:any) {
  return (
    <div className='flex h-screen items-center justify-center flex-col'>
      <h1>Profile page</h1>
      <h1 className='bg-green-500 text-white px-4 py-2 rounded mt-1'>{params.id}</h1>
    </div>
  )
}

export default page
