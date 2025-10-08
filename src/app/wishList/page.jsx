'use client'
import React, { useEffect, useState } from 'react'
import getWishList from "@/wishListActions/getWishList";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
import Image from 'next/image';
import AddBtn from './../_components/addBtn/AddBtn';
import deleteItemFromWishList from '@/wishListActions/deleteItemFromWishList';
import toast from 'react-hot-toast';

export default function WishList() {
    const [wishlistitems, setwishlistitems] = useState([])

    async function getWishListIems(){
        let res = await getWishList();
        console.log(res);
        if(res.status==="success")
        {
            setwishlistitems(res)
        }
    }
    useEffect(()=>{
        getWishListIems();
    },[])

    async function deleteWishListItem(id){
        console.log(id);
        let res = await deleteItemFromWishList(id)
        console.log(res);
        if(res.status==="success")
        {
            getWishListIems();
            toast.success('item deleted successfully ')
        }
        
    }
  return (
    <>
    {wishlistitems.count>0? <div className="w-[80%] mx-auto flex flex-wrap gap-4  my-12 py-6">
      {wishlistitems?.data.map((product) => (
        <div className=" w-[90%] md:w-1/3 lg:w-1/5 mx-auto" key={product.id}>
          <Card className="p-2">
          <i class="fa-solid fa-heart text-3xl text-red-600"></i>
          <Link href={`/products/${product.id}`}>
            <CardHeader>
              <CardTitle>
                <Image src={product.imageCover} className="w-full" alt="" width={500} height={500}/>
              </CardTitle>
              <CardDescription><div className="text-green-600 font-bold">{product.category.name}</div></CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl">{(product.title).split(" ").slice(0,2)} </p>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-700" > {product.price} EGP </span>
                <span className="text-gray-700" > {product.ratingsAverage} <i className="fa-solid text-yellow-500 fa-star"></i> </span>
              </div>
            </CardFooter>
          </Link>
          
        <div>
          <div className='flex'>
            <div className='w-3/4'>
            <AddBtn id={product.id} />

            </div>
          <button onClick={()=>deleteWishListItem(product.id)} className='w-1/4 '>
          <i className='fas fa-trash text-2xl text-red-600 cursor-pointer hover:text-red-700'></i>

          </button>
          </div>
          
          </div>       
          </Card>
      
        </div>
      ))}
    </div> : <h1 className="mx-auto text-center my-12 text-red-600 font-bold text-3xl">
        No Products To Show !
      </h1>}
    </>
  )
}

