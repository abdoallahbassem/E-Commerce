"use client"
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import Link from "next/link";
import Image from 'next/image';
import AddBtn from '../addBtn/AddBtn';
import addToWishList from '@/wishListActions/addToWishList';
import toast from 'react-hot-toast';
export default  function AllProducts() {


    const [data, setData] = useState([]);
    const [disabled, setdisabled] = useState(false)


  async function getcateg() {
    let response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    let { data } = await response.json();
    return data;
  }

  useEffect(() => {
    getcateg().then((res) => {
      setData(res);
    });
  }, []);
  console.log(data);

  async function addItemToWishList(id){
    setdisabled(true)
    let res = await addToWishList(id);
    console.log(res);
    if(res.status==="success")
    {
      toast.success("Item added to wishlist successfully ❤");
      setdisabled(false);
    }
    
  }


  return (
<div className="w-[80%] mx-auto flex flex-wrap gap-4  my-12 py-6">
      {data.map((product) => (
        <div className=" w-[90%] md:w-1/3 lg:w-1/5 mx-auto" key={product.id}>
          <Card className="p-2">
          
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
          
        <div className='flex p-3 justify-between'>
          <div className='w-3/4 '>
          <AddBtn id={product.id} /> 
          </div>
          <button onClick={()=>addItemToWishList(product.id)}>
          {disabled?<i className="fas  fa-spinner fa-spin"></i>: <i class="fa-solid fa-heart text-3xl ms-auto w-1/4 hover:text-green-600 hover:duration-300 cursor-pointer   "></i>}
          </button>
          </div>       
          </Card>
      
        </div>
      ))}
    </div>  )
}
