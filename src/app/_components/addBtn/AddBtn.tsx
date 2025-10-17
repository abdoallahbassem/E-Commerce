"use client";
import addToCart from "@/cartActions/addToCart";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/cartContext";
import getMyToken from "@/utilites/getMyToken";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { string } from "zod";

export default function AddBtn({ id }: { id: string }) {
  const [disabled, setdisabled] = useState(false)

  const {numOfCart,setnumOfCart}=useContext(CartContext)
  async function checkAddProduct(id: string) {
    setdisabled(true);
    let res = await addToCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Item added to cart successfully ");
      setnumOfCart(numOfCart+1)
    } else if (res.status === "unauthorized") {
      toast.error("Login first to add item to cart !");
    } else {
      toast.error("Something went wrong!");
    }
  
    setdisabled(false);
  }
  return <Button disabled={disabled} className="cursor-pointer w-full disabled:bg-gray-500 " onClick={() => checkAddProduct(id)}>{disabled?<i className="fas  fa-spinner fa-spin"></i>:"add to cart"}</Button>;
}
