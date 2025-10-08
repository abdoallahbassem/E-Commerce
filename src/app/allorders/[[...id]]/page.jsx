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

  // استخراج userId من التوكن مرة واحدة لما السيشن تتغير
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

  // استدعاء الأوردرز لما الـ userId أو id يتغير
  useEffect(() => {
    if (id || userid) {
      AllOrders(userid);
    }
  }, [id, userid]);

  return (
    <>
      <h1 className='font-bold text-green-600 my-5 text-4xl text-center'>My Orders</h1>
      {orders.map((item) => (
        <div key={item.id} className='w-[80%] mx-auto flex justify-between items-center border-2 mt-10 shadow-xl p-4'>
          <div className=' flex flex-col justify-center items-center'>
            <img src={item.cartItems[0].product.imageCover} className=' size-[150px]' alt="" />
            <h1 className='font-bold  text-neutral-400'>{item.cartItems[0].product.category.name}</h1>
            <h1 className='font-bold text-green-600'>{item.cartItems[0].product.title}</h1>
          </div>
          <div>
            <h1 className=' text-3xl font-bold text-slate-900 my-2'>order details</h1>
            <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
              order id : <span className='font-mono text-[16px] text-neutral-400'>{item.id}</span>
            </p>
            <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
              payment method : <span className='font-mono text-[16px] text-neutral-400'>{item.paymentMethodType}</span>
            </p>
            <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
              user name : <span className='font-mono text-[16px] text-neutral-400'>{item.user.name}</span>
            </p>
            <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
              phone number : <span className='font-mono text-[16px] text-neutral-400'>{item.user.phone}</span>
            </p>
            <p className='text-xl font-bold text-slate-900 my-2 indent-1'>
              total price : <span className='font-mono text-[16px] text-neutral-400'>{item.cartItems[0].price}</span>
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
