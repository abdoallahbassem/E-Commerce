"use client"
import React from 'react'
import getSpecificBrand from "@/brandsActions/getSpecificBrand";

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
export default function BrandDetails() {
    const [specificBrand, setspecificBrand] = useState({});
    let {id}=useParams()
    console.log("id",id);    
    async function singleBrand(){
        let res = await getSpecificBrand(id);
        console.log(res);
        setspecificBrand(res.data)
        

    }
    useEffect(()=>{
        singleBrand();
    },[])
  return (
<div className='w-[40%] mx-auto my-14 border-4 '>
      <img src={specificBrand.image} alt="" className='w-1/2 mx-auto' />
      <p className='text-3xl text-green-600 font-bold my-3 text-center'>
        {specificBrand.name}
      </p>
      </div>  )
}
