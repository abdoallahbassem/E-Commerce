"use client"
import getAllBrands from "@/brandsActions/getAllBrands";
import {
  Card,
  
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from 'react'
export default function Brands() {
  const [loading, setloading] = useState(false)
  const [brands, setbrands] = useState([]);
  async function getBrands(){
    setloading(true);
    let res = await getAllBrands();
    console.log(res);
    if(res.data){
      setbrands(res.data);
      setloading(false);
    }
  }
  useEffect(()=>{
    getBrands();
  },[])
  return (
    <>
    {loading==true ? <div className=" h-screen flex items-center justify-center">
    <span className="loader "></span>
  </div> :<div className="w-[80%] mx-auto flex flex-wrap gap-4  my-12 py-6">
      {brands.map((brand) => (
        <div className=" w-[90%] md:w-1/3 lg:w-1/5 mx-auto" key={brand._id}>
        <Link href={`/brands/${brand._id}`}>
        <Card className="p-2 h-[250px] cursor-pointer">
            
              <CardHeader>
                <CardTitle>
                  <Image
                    src={brand.image}
                    className="w-full h-[170px] object-center"
                    alt=""
                    width={500}
                    height={500}
                  />
                </CardTitle>
                <CardDescription>
                  <div className="text-green-600 font-bold mx-auto text-center">{brand.name}</div>
                </CardDescription>
              </CardHeader>
            
          </Card>
        </Link>
        </div>
      ))}
    </div>}
    </>  )
}
