"use client"
import React, { useEffect, useState } from 'react'
import getAllOrders from '@/ordersActions/getAllOrders';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { jwtDecode } from 'jwt-decode';

export default function Allorders() {
  const [userid, setuserid] = useState("")
  const { data: session, status } = useSession();
  const [orders, setorders] = useState([])
  let { id } = useParams();

  useEffect(() => {
    if (status === "authenticated" && typeof session?.token === "string") {
      const decoded = jwtDecode(session.token);
      setuserid(decoded.id);
    }
  }, [status, session]);

  async function AllOrders(userIdParam) {
    let res = await getAllOrders(id ?? userIdParam);
    console.log(res);
    if (res.length > 0) {
      setorders(res);
    }
  }

  useEffect(() => {
    if (id || userid) {
      AllOrders(userid);
    }
  }, [id, userid]);

  return (
    <>
      {orders.length > 0 ? (
        <>
          <h1 className='font-bold text-green-600 my-5 text-4xl text-center'>My Orders</h1>
          {orders.map((order) => (
            <div key={order.id} className='w-[80%] mx-auto border-2 mt-10 shadow-xl p-4'>
              
              <div className='flex flex-wrap gap-6 justify-center'>
                {order.cartItems.map((cartItem, index) => (
                  <div key={index} className='flex flex-col justify-center items-center border p-4 rounded-xl shadow-md w-1/5'>
                    <img 
                      src={cartItem.product.imageCover} 
                      className='size-[150px]' 
                      alt={cartItem.product.title} 
                    />
                    <h1 className='font-bold text-neutral-400'>{cartItem.product.category.name}</h1>
                    <h1 className='font-bold text-green-600'>{cartItem.product.title}</h1>
                    <h2 className='text-neutral-500 font-mono mt-1'>Price: {cartItem.price}</h2>
                    <h2 className='text-neutral-500 font-mono'>Count: {cartItem.count}</h2>
                  </div>
                ))}
              </div>

              <div className='mt-6'>
                <h1 className='text-3xl font-bold text-slate-900 my-2'>Order Details</h1>
                <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
                  Order ID: <span className='font-mono text-[16px] text-neutral-400'>{order.id}</span>
                </p>
                <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
                  Payment Method: <span className='font-mono text-[16px] text-neutral-400'>{order.paymentMethodType}</span>
                </p>
                <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
                  User Name: <span className='font-mono text-[16px] text-neutral-400'>{order.user.name}</span>
                </p>
                <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
                  Phone Number: <span className='font-mono text-[16px] text-neutral-400'>{order.user.phone}</span>
                </p>
                <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
                  Total Price: <span className='font-mono text-[16px] text-neutral-400'>{order.totalOrderPrice}</span>
                </p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h1 className="mx-auto text-center my-12 text-red-600 font-bold text-3xl">
          No Products To Show !
        </h1>
      )}
    </>
  )
}
