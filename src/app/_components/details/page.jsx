"use client"
import Image from 'next/image'
import React from 'react'
import AddBtn from '../addBtn/AddBtn'

export default function ProductDetails({data}) {
  return (
<div className="flex justify-between gap-2 w-[90%] mx-auto mt-10 items-center flex-col lg:flex-row ">
        <div className="left w-full lg:w-1/4">
            <Image src={data.imageCover} className='w-full' alt="" width={500} height={500}/>
        </div>
        <div className='right w-full lg:w-3/4 text-3xl flex flex-col gap-6 p-4 '>
        <p className=''>
            {data.title}
        </p>
        <span className='text-xl text-gray-500'>
            {data.description}
        </span>
        <span className=' text-xl text-green-600'>
            {data.category.name}
        </span>
        <div className='flex justify-between items-center'>
        <span className=' text-xl text-gray-600'>
            {data.price} EGP
        </span>
        <span className='text-gray-600'>
             <i class="fa-solid text-yellow-500 fa-star"></i>
             {data.ratingsAverage}
        </span>
        </div>
        <AddBtn id={data.id}/>         </div>
    </div>  )
}
