"use client";
import React, { useContext, useEffect, useState } from "react";
import getUserCart from "@/cartActions/getUserCart";
import toast from "react-hot-toast";
import deleteItem from "@/cartActions/deleteItem";
import updateQuantity from "@/cartActions/updateQuantity";
import clearAll from "@/cartActions/clearAll";
import { Button } from '@/components/ui/button';
import { CartContext } from './../../context/cartContext';
import  Link  from 'next/link';

export default function Cart() {
  const {numOfCart,setnumOfCart} = useContext(CartContext)
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true)
  const [disabled, setdisabled] = useState(false)
  const [updateLoading, setupdateLoading] = useState(false)
  const [currentId, setcurrentId] = useState("")
  const [removedisabled, setremovedisabled] = useState(false)
  const [totalPrice, settotalPrice] = useState(0)
  const [cartId, setcartId] = useState("")
  async function getLoggedUserCart() {
    try {
      let res = await getUserCart();
      if (res?.status === "success") {
        console.log(res);
        setproducts(res?.data?.products);
        settotalPrice(res?.data?.totalCartPrice)
        setloading(false)
        setcartId(res?.data?._id);
      }
    } catch {
      throw new Error("error in getting user cart");

    }
  }
  useEffect(() => {
    getLoggedUserCart();
  }, []);
  console.log(products);


  async function handleDeleteItem(id){

    setdisabled(true)

    setremovedisabled(true)
    let res = await deleteItem(id);
    console.log(res);
    if(res.status==="success"){
      toast.success("product deleted successfully")
      setproducts(res?.data?.products);
      setremovedisabled(false)
      setdisabled(false)
      let sum = 0 
      res.data.products.forEach((product)=>{
          sum+=product.count
      })
      setnumOfCart(sum); 
      
    }
    else {
      toast.error("can't delete this item")
      setremovedisabled(false)
      setdisabled(false)
      
    }
    

  }


  async function handleUpdateQuantity(id,count,sign){
    setremovedisabled(true)
    setupdateLoading(true)
    setcurrentId(id)
    setdisabled(true)
    let res = await updateQuantity(id,count);
    console.log(res);
    if(res.status==="success"){
      setproducts(res?.data?.products);
      toast.success("item updated successfully")
      setdisabled(false)
      setupdateLoading(false)
      setremovedisabled(false)
      if(sign==="-"){
        setnumOfCart(numOfCart-1)
      }
      else if (sign==="+")
        setnumOfCart(numOfCart+1)
    }
    else {
      toast.error("can't delete this item")
      setdisabled(false)
      setupdateLoading(false)
      setremovedisabled(false)
    }
    
  }

  async function handleClearCart(){
    let res = await clearAll();
    console.log(res);
    if(res.message==="success"){
      setproducts([])
      toast.success("cart cleared successfully")
      setnumOfCart(0)
    }
    else {
      toast.error("can't clear cart")
    }
  }

  if(loading){
    return (<>

 <div className=" h-screen flex items-center justify-center">
    <span className="loader "></span>
    </div>
 

    </>)
  }

  return (
    <>
      {products?.length > 0 ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] mx-auto my-12 ">
        <div className="my-5 flex justify-end">
          <h1 className="text-center mx-auto font-bold text-green-600 text-3xl my-5">
            Total Cart Price: {totalPrice}
          </h1>
          <Button onClick={()=>handleClearCart()} className="px-5 py-5 text-xl bg-red-600 hover:bg-red-700 cursor-pointer" >
          clear cart
        </Button></div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product?.product?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product?.product?.category?.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center ">
                    <button
                    disabled={disabled}
                    onClick={()=>handleUpdateQuantity(product.product.id,product.count -1,"-")}
                      className="inline-flex disabled:bg-slate-300 cursor-pointer disabled:cursor-auto items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product.product.id===currentId? (updateLoading?<i className="fas fa-spinner fa-spin"></i>:<span> {product.count} </span>):<span> {product.count} </span>}
                      </span>
                    </div>
                    <button
                    onClick={()=>handleUpdateQuantity(product.product.id,product.count +1,"+")}
                    disabled={disabled}
                       className="inline-flex disabled:bg-slate-300 cursor-pointer disabled:cursor-auto items-center justify-center p-1 ms-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product?.price *product.count} EGP
                </td>
                <td className="px-6 py-4">
                  <button
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 cursor-pointer disabled:text-gray-500 disabled:cursor-auto"
                     onClick={()=>handleDeleteItem(product.product.id)}
                     disabled={removedisabled}
                  >
                    
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href={`/checkout/${cartId}`}>
        <Button className="w-full  my-4 py-5 cursor-pointer ">
          checkout now
        </Button>
        </Link>
      </div>: 
      <h1 className="mx-auto text-center my-12 text-red-600 font-bold text-3xl">
        No Products In The Cart
      </h1>
       }
    </>
  );
}
