"use client";
import React, { useEffect, useState } from "react";
import getAllCategories from "@/categoryActions/getAllCategories";
import {
  Card,

  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const [loading, setloading] = useState(false)
  const [Categories, setCategories] = useState([]);
  async function getCategories() {
    setloading(true);
    let res = await getAllCategories();
    console.log(res);
    if(res.data){
      setCategories(res.data);
      setloading(false);
    }
    
  }
  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    <>
    {loading==true ? <div className=" h-screen flex items-center justify-center">
    <span className="loader "></span>
  </div> :<div className="w-[80%] mx-auto flex flex-wrap gap-4  my-12 py-6">
      {Categories.map((categ) => (
        <div className=" w-[90%] md:w-1/3 lg:w-1/5 mx-auto" key={categ._id}>
        <Link href={`/categories/${categ._id}`}>
        <Card className="p-2 h-[250px] cursor-pointer">
            
              <CardHeader>
                <CardTitle>
                  <Image
                    src={categ.image}
                    className="w-full h-[170px] object-center"
                    alt=""
                    width={500}
                    height={500}
                  />
                </CardTitle>
                <CardDescription>
                  <div className="text-green-600 font-bold mx-auto text-center">{categ.name}</div>
                </CardDescription>
              </CardHeader>
            
          </Card>
        </Link>
        </div>
      ))}
    </div>}
    </>
  );
}
