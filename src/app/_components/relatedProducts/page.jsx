"use client"
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddBtn from '../addBtn/AddBtn';
export default function RelatedProducts({data}) {
  return (
    <>
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
          
        <AddBtn id={product.id}/>          
          </Card>
      
        </div>
      ))}
    </div>
    </>
  )
}
